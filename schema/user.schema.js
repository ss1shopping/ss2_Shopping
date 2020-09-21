var mongoose =require('mongoose')
var bcrypt =require("bcryptjs")

var Schema=mongoose.Schema;

var userSchema= new Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
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
card:[],
history:[],
 
    
    day:{
        type:Date,
        default: Date.now
    },
    
},
{
    timestamps:true,
},
{
    collection: "User"
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true }}
);


userSchema.virtual('payment', {
  ref: 'payment',
  localField: '_id',
  foreignField: 'userid',
  justOne: false,
  count: true,
  match: { userid: this._id }
})
userSchema.virtual('shoppingItem', {
  ref: 'shoppingItem',
  localField: '_id',
  foreignField: 'userid',
  justOne: false,
  count: true,
   match: { userid: this._id }
})
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
userSchema.methods.isValidPassword=async function(newPassword){
try{
   return await bcrypt.compare(newPassword,this.password)                 //phair cos return
}catch(error){
    throw error
    
    
 }
}

module.exports= mongoose.model('users',userSchema);