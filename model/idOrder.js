import mongoose from "mongoose";


const idOrderSchema = mongoose.Schema({
    order:{
        type:Array,
    }
})


const IdOrder = mongoose.model('IdOrder',idOrderSchema);

export default IdOrder;