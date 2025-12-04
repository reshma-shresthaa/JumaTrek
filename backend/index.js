import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 6000

let app = express()

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT,()=>{
    connectDb()
    console.log("Server started at port ", PORT)
})