const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.router")
require("dotenv").config()
const {auth}=require("./middleware/auth.middleware")
const cors=require("cors")


const app=express()
app.use(express.json())
app.use(cors())

app.use("/user",userRouter)
app.use(auth)
app.use("/note",noteRouter)





app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("DB is connected")

    } catch (error) {
        console.log(error)
    }
})