const mongoose = require("mongoose")
const Schema = mongoose.Schema
const paymentSchema = new Schema({
    userid: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    
    totalPrice: {
        type: Number,
        required: true,
    },
   product:[ 
 ]
}, {
    collection: "payment"
}, { timestamps: true },

)
const payment=mongoose.model("payment",paymentSchema)
module.exports=payment