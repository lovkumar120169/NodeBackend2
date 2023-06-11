const mongooes=require("mongoose")

const noteSchema=mongooes.Schema({
    name:String,
    note:String,
    userID:String
},{
    versionKey:false
})

const NoteModel=mongooes.model("note",noteSchema)

module.exports={NoteModel}