
import express from "express";
import dotenv from "dotenv"
dotenv.config();

// const Connection = require("./connect/db.js")

import Connection from "./connect/db.js";
const app = express();




app.use("/api/v1",(req,res)=>{
    res.send("yes this is running");
})
const Port = process.env.PORT;


Connection();
app.listen(Port,(req,res)=>{
    console.log(`This server is running on port ${Port}`);
})