import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
       type:String,
        required:true 
    },
    password:{
        type:String,
        required:true
    },
    contact:{
    type: String,
    required: true
    },
    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    },
    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User