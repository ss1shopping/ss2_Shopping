
const key =require("../config/index")

const jwt =require("jsonwebtoken")
auth=(req,res,next)=>{

const token= req.headers.authorization.split(" ")[1]
try{
  // const token =req.headers.authorization.split(" ")[1];
    const decoded= jwt.verify(token,key.secretkey)
    req.users= decoded

    next();
}
catch(e){
    res.status(400).json({mes:"not token"})
}
//verify token

}

module.exports=auth;