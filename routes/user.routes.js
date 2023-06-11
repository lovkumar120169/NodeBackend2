const express=require("express")
const {UserModel}=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()


userRouter.post("/register",(req,res)=>{
    try {
        const {name,email,pass,age}=req.body;
        console.log(req.body)
        bcrypt.hash(pass, 5,async(err, hash)=> {
            if(err){
                res.json({err:"Some"})
            }else{
                const user=new UserModel({...req.body,pass:hash})
                // console.log(user)
                await user.save()
                res.json({msg:"New user is Registered"})
            }
        });
        
    } catch (error) {
        res.json({error:"Something Went Wrong"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await UserModel.findOne({email:email});
        console.log(user)
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=> {
                if(result){
                    const token=jwt.sign({userID:user._id},process.env.secretKey)
                    res.json({msg:"Login Successful",token})
                }else{
                    res.json({msg:"password dosnot match"})
                }
            });
        }else{
            res.json({err:"User not fount"})
        }
    } catch (error) {
        res.json({err:"wrong credential"})
        
    }
})

module.exports={userRouter}