import express from "express"
const router = express.Router()
import Todo from "./model/todos.js"
import IdOrder from "./model/idOrder.js"



router.get("/Alltodos", async (req, res) => {
    try {
        let todos = await Todo.find({})
        if (todos) {
            let data = await IdOrder.findOne({})
            if(data){
                const order = data.order
                res.status(200).json({ todos, order })
            }
            else{
                res.status(200).json({ todos, order:[] })
            }
        }
    }
    catch (err) {
        console.log(err)
    }
})


router.post("/Addtodo", async (req, res) => {
    try {

        const { task, date, status } = req.body;
        let todo = new Todo({ task, date, status })
        if (await todo.save()) {
            res.status(200).json({ message: "todo Added", status: 1 })
        }
        else {
            res.status(200).json({ message: "todo not added", status: 0 })
        }


    }
    catch (error) {
        console.log("Error:", error)
    }
})



router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (await Todo.deleteOne({ _id: id })) {
            await IdOrder.updateOne({},{$pull:{"order":id}})
            res.status(200).json({ message: "todo Deleted" })
        }
    } catch (err) { console.log(err) }

})



router.put("/updateTodo/:id", async (req, res) => {
    try {

        const { task, date } = req.body;
        await Todo.updateOne({ _id: req.params.id, }, { $set: { task, date } })
        res.status(200).json({ status: 1 })


    }
    catch (error) {
        console.log("Error:", error)
    }
})


router.put("/updateStatus/:id", async (req, res) => {
    try {

        const { status } = req.body;
        // const {task,date} = req.body;
        await Todo.updateOne({ _id: req.params.id, }, { $set: { status } })



        res.status(200).json({ val: 1 })


    }
    catch (error) {
        console.log("Error:", error)
    }
})

router.put("/ListOrder", async (req, res) => {
    try {
        const { order } = req.body
        const findData = await IdOrder.find({})
        if (findData.length == 0) {

            let od = new IdOrder({ order })
            await od.save();
            res.send("added")

          
        }
        else {
            await IdOrder.updateOne({}, { $set: { order } })
            res.send("updated")
        }
    }
    catch (err) { (console.log(err)) }
})

export default router