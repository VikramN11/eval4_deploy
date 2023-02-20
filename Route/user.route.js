const express = require("express");
const { UserModel } = require("../Model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const userRouter = express.Router();

userRouter.post("/register", async(req, res) =>{
    const {name,email,password,gender,age,city} = req.body;
    try{
        const token = jwt.sign({userId: "id"}, 'linked');
        const data = await UserModel.find({email});
        if(data.length>0){
            res.send("User already exist, please login");
        }
        else{
            jwt.verify(token, 'linked', (err, decoded)=>{
                console.log(decoded);
              });
            bcrypt.hash(password, 7, async(err, hash) =>{
                if(err) res.send("Wrong Credentials");
                else{
                    const user = new UserModel({name,email,password:hash,gender,age,city});
                    await user.save();
                    res.send("User has been Registerd");
                }
            });
            
        }
    } 
    catch(err){
        res.send(err.message);
    }
})

userRouter.post("/login", async(req, res)=>{
    const {email, password}=req.body;
    try {
        const data = await UserModel.find({email});
        if(data.length>0){
            bcrypt.compare(password, data[0].password, (err, result) =>{
                if(result){
                    const token = jwt.sign({userId: req.body._id}, 'linked');
                    res.send({"msg":"Login Successfully", "token":token});
                }
                else{
                    res.send("Something went wrong");
                }
            });
            // res.send("Login Successfully");
        }
        else{
            res.send("Wrong Credentials");
        }
    } catch (err) {
        res.send(err.message);
    }
})



module.exports = {userRouter};