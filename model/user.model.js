const mongooes=require("mongoose")

const userSchema=mongooes.Schema({
    name:String,
    email:String,
    pass:String,
    age:Number
},{
    versionKey:false
})

const UserModel=mongooes.model("user",userSchema)

module.exports={UserModel}