import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import AppRoutes from "./src/routes/index.js"
import bodyParser from "body-parser"
import { EventEmitter } from 'events'
// Increase the maximum number of listeners for TLSSocket
EventEmitter.defaultMaxListeners = 15; // or any other suitable value
dotenv.config()

const app= express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())
app.use(AppRoutes)
app.get('/',(req,res)=>{
    res.status(200).send({
        message:`server running in ${process.env.PORT}`
    })
})
app.listen(process.env.PORT,()=>console.log("Server Listening in "+process.env.PORT))