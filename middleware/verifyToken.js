
const key =require("../config/index")

const jwt =require("jsonwebtoken")
auth=(token)=>{

 token= token.split(" ")[1]
try{
  // const token =req.headers.authorization.split(" ")[1];
    const decoded= jwt.verify(token,key.secretkey)
   return decoded

  
}
catch(e){
   return ({msg:"invalid token"})
}
//verify token

}

module.exports=auth;