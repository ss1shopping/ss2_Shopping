var mongoose =require('mongoose')
var bcrypt =require("bcryptjs")

var Schema=mongoose.Schema;

var userSchema= new Schema({
    username:{
         type:String,
          unique :true,
          minlength:3,
    },
    password:{
        type:String,
        minlength:8,
         
   
   },
   
   email:{
    type:String,
    unique :true 
}, 
active:{
    type:Boolean,
    default:false
},
role:{
  type:Number,
  default:0
},
 
    
    day:{
        type:Date,
        default: Date.now
    },
    
},
{
    timestamps:true,
},
{
    collection: 'login'
},
);
userSchema.pre("save",async function(next){
try{
  
const salt=await bcrypt.genSalt(10)
 const passwordHash =await bcrypt.hash(this.password,salt)
 //tao secretToken de gui verifi email

//tao trang thai false (chua )

 this.password=passwordHash
 next()
}catch(error){
    console.log(error);
    
next(error)
}
})
// userSchema.methods.isValidPassword=async function(newPassword){
// try{
//    return await bcrypt.compare(newPassword,this.password)                 //phair cos return
// }catch(error){
//     throw error
    
    
//  }

module.exports= mongoose.model('users',userSchema);