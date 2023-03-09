// const mongoose = require("mongoose");
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();




const Db = process.env.DATABASE




 const Connection = () => {
    mongoose.connect(Db, { useNewUrlParser: true })

    mongoose.connection.on('connected',()=>{
        console.log("Database Connected successfully")
    })

    mongoose.connection.on('disconnected',()=>{
        console.log("Database Disconnected")
    })

    mongoose.connection.on('err',()=>{
        console.log("Database Error while Conncecting",error.message);
    })

}

export default  Connection
