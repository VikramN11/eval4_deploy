const express = require("express");
const {connection} = require("./db");
const {userRouter} = require("./Route/user.route");
const {postRouter} = require("./Route/post.route");
const { authenticate } = require("./Middleware/authentication.middleware");
var cors = require("cors");
 

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Welcome to Home Page");
})

app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", postRouter);

app.listen(process.env.port, async()=>{
    try{
        await connection;
    } 
    catch(err){
        console.log(err);
    }
})