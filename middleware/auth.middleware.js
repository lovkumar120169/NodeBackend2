const express = require("express")
const jwt=require("jsonwebtoken")
const app=express()
require("dotenv").config()

app.use(express.json())


const auth=async(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    
    if(token){
        const decode=jwt.verify(token,process.env.secretKey)
        if(decode){
            req.body.userID=decode.userID
            next()
        }else{
            res.json({msg:"login First"})
        }
    }else{
        res.json({msg:"please login first"})
    }
}

module.exports={auth}