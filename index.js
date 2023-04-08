import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path"
import { fileURLToPath } from 'url';

dotenv.config();


import Connection from "./connect/db.js";
import router from "./routes.js";
const app = express();


app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())




const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, "./TodoFrontEnd/build")));


app.use("/api/v1",router)
const Port = process.env.PORT || 6969;



app.get("*", function (_, res) {
    res.sendFile(
      path.join(__dirname, "./TodoFrontEnd/build/index.html"),
      function (err) {
        res.status(500).send(err);
      }
    );
  });




Connection();
app.listen(Port,(req,res)=>{
    console.log(`This server is running on port ${Port}`);
})