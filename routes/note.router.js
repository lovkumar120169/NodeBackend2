const express = require("express")
const { NoteModel } = require("../model/note.model")

const noteRouter = express.Router()
// binod

noteRouter.get("/notes", async (req, res) => {
    console.log(req.body)
    try {
        const notes = await NoteModel.find({userID:req.body.userID})
        // console.log(notes)
        res.json(notes)
    } catch (error) {
        res.json({error})
    }
})
noteRouter.post("/AddNote", async(req,res)=>{
    try {
        const note=new NoteModel(req.body)
        await note.save()
        res.json({msg:"New note is Added",note:note})
    } catch (error) {
        res.json({err:"something went wrong"})
    }
})
noteRouter.delete("/deleteNote/:id",async(req,res)=>{
    const {id}=req.params
    console.log(id)
    try {
        const note=await NoteModel.deleteOne({_id:id})
        res.json({msg:"Product Deleted"})
    } catch (error) {
        res.json({error})
    }
})

noteRouter.put("/updateNote/:id",async(req,res)=>{
    const {id}=req.params
    console.log(id)
    try {
        const note=await NoteModel.findByIdAndUpdate({_id:id},req.body)
        res.json({msg:"Product Updated"})
    } catch (error) {
        res.json({error})
    }
})





module.exports = { noteRouter }




