const puppeterr=require("puppeteer");
var redis =require("redis")
var portRedis=process.env.portRedis || 6379
const clientredis=redis.createClient(portRedis)

const setdata=(srcimg)=>{
  console.log(srcimg.title1[0]);
  
  let data=[];
  for(var i=0;i<srcimg.title1.length;i++){
      const objectData={
        title1:srcimg.title1[i],
        title2:srcimg.title2[i],
        urlImage:srcimg.UrlImage[i]
      }
      console.log(objectData);
      
      data.push(objectData)
     
  }
   return data;
}
module.exports={
getdata:async(req,res,next)=>{
  
 try {
   const browser =await puppeterr.launch({headless: false});
   const pg=await browser.newPage();
   await pg.setDefaultNavigationTimeout(0);
await  pg.goto("http://www.phimmoizz.net/")
  const srcimg=await pg.evaluate( async()=>{
    const images=Array.from(document.querySelectorAll(".public-film-item-thumb"))
    
    const div=Array.from(document.querySelectorAll(".movie-title-1"))
    const div1=Array.from(document.querySelectorAll(".movie-title-2"))
     let title1 =div.map((i)=>i.innerHTML);
      let title2=div1.map((i)=>i.innerHTML);
    
    
     let UrlImage=images.map((i)=>i.getAttribute("style"));
     
    for(let i=0;i<UrlImage.length;i++){
      let a=UrlImage[i].split("(")
       UrlImage[i]=a[1].replace("'","");
        UrlImage[i]=UrlImage[i].replace("')","");
    }

        return({title1,title2,UrlImage});
    });
    
  await browser.close();
  
  
  const data=setdata(srcimg)
   clientredis.setex("datacrawler",10000,JSON.stringify(data))
    res.json({data:data})
 } catch (error) {
   console.log(error);
   
 }
  
},
getDataFromRedis:async(req,res,next)=>{
clientredis.get("datacrawler",(err,data)=>{
    if(err) throw err;
    if(data!==null || undefined){
     const newdata=JSON.parse(data);
     res.status(200).json({data:newdata})
    }else{
    next();
    }
})
}
}