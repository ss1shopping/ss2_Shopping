const fs =require("fs");

module.exports={
  send: async(req,res,next)=>{
    
       var content=fs.readFileSync(req.file.path,"utf-8")
        console.log(content);
        
       res.json(content)
       
  }
}