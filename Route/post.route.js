const express = require("express");
const { PostModel } = require("../Model/Post.model");

const postRouter = express.Router();

postRouter.get("/", async(req, res) =>{
    try {
        const data = await PostModel.find();
        res.send(data);
    } 
    catch (err) {
        res.send(err.message);
    }
})

postRouter.post("/create", async(req, res) =>{
    try {
        const data = new PostModel(req.body);
        await data.save();
        res.send({"msg":"New Post has been added", "data":data});
    } 
    catch(err){
        res.send(err.message);
    }
})

postRouter.patch("/update/:id", async(req, res) =>{
    const ID = req.params.id;
    try {
        const data = await PostModel.findByIdAndUpdate({_id:ID});
        res.send(data);
    } catch (err) {
        res.send(err.message);
    }
})

postRouter.delete("/delete/:id", async(req, res) =>{
    const ID = req.params.id;
    try {
        const data = await PostModel.findByIdAndDelete({_id:ID});
        res.send(data);
    } catch (err) {
        res.send(err.message);
    }
})

module.exports = {postRouter};