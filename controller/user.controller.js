const User =require("../schema/user.schema")
const JWT =require("jsonwebtoken");
var redis =require("redis")
var portRedis=process.env.portRedis || 6379
const clientredis=redis.createClient(portRedis)
const key =require("../config/index")

const verifyToken =require("../middleware/verifyToken")
const tokenList={};
 const signToken = users => {
  return JWT.sign(
    {
      iss: "xoaycodeeasy",
      sub: users._id,
      iat: new Date().getTime(), // current time
      exp: Math.floor(Date.now() / 1000) + (20),  //1h =60*60
    },
    key.secretkey,{
     
    }
  );
};
const refreshToken=users=>{
  return JWT.sign(
    {
      iss:"refreshToken",
      sub:users._id,
      iat:new Date().getTime(),
      exp: Math.floor(Date.now() / 1000) + (60*60*12)
    },
    key.refreshtoken
  )
}
const setResponse=(email,data)=>{
        return "token is save"
  }
  
  
  
   

  
module.exports={
  createuser: async(req,res,next)=>{
     const {username, password,email}=req.body;
     if(!username || !password ||!email){
      return res.status(404).json({mes:"pls enter all field"})
     }
    const user= await User.findOne({email:email})
     if (user){
       return res.status(401).json({mes:"Email has already exist"})
     }
     var newuser=new User({
       username, password, email
     })
    const result= await newuser.save();
    return res.json({
      user:newuser
    })
   

  },
  login:async (req,res,next)=>{
    const token=signToken(req.user)
    const refreshtoken=refreshToken(req.user)
    tokenList[refreshtoken]=req.user
    try {
      clientredis.setex(req.user.email,200,refreshtoken)
     const msg=await setResponse(req.user,req.user.email)
     res.status(200).json({token:token,user:req.user,refreshToken:refreshtoken,msg:msg})
    } catch (error) {
      
      
      res.status(500).json({msg:"error"})
    }
     
     
    // console.log(tokenList);  
    //    res.status(200).json({token:token,user:req.user,refreshToken:refreshtoken})

  },
  refreshToken: async (req,res,next)=>{
    const {refreshToken}=req.body
    if((refreshToken) && (refreshToken in tokenList)){
      try {
       JWT.verify(refreshToken,"refreshToken",(err,user)=>{
         if(err){
           return res.status(400).json({mes:"not correct"})
         }
         console.log(tokenList);
         
           const users=tokenList[refreshToken]
           const token=signToken(users)
           res.status(200).json({token:token})
       }) 
        
        
        
      } catch (error) {
        console.error(error);
      res.status(403).json({
        message: 'Invalid refresh token',
      });
      }
    }
    else {
      console.log(tokenList);
      
      
    res.status(400).json({
      message: 'Invalid request',
    });
  }
  },
  checkToken:async (req,res,next)=>{
    console.log("checkToken xem the nao");
    res.status(200).json({mes:"ok"})
    
  },
  getFromRedis: async (req,res,next)=>{
   
   

 clientredis.get(req.user.email,(err,data)=>{
    if(err) throw err;
    if(data!==null || undefined){
     res.status(200).json({data:data})
    }else{
    next();
    }
   
   
  })
  
} 
}