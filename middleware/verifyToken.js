const jwt=require("jsonwebtoken");
const key =require("../config/index")
module.exports={
  verifyToken:(token,secretKey)=>{
    return new Promise((resolve,reject)=>{
      jwt.verify(token,secretKey,(err,decoded)=>{
        if(err){
          return reject(err)
        }
        resolve(decoded)
      })
    })
  }
}