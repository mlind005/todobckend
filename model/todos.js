import mongoose from "mongoose";


const todoSchema = mongoose.Schema({
    task:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:false
    }
})


const Todo = mongoose.model('Todos',todoSchema);

export default Todo