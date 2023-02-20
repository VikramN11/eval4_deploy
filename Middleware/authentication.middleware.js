const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) =>{
    const token = req.headers.authorization;
    jwt.verify(token, 'linked', (err, decoded)=>{
        if(decoded){
            next();
        }
        else{
            res.send("Please login first");
        }
      });
}

module.exports = {authenticate};