const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    username:String,
    name:String,
    age:Number,
    email:String,
    password:String,
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"post"
        }
    ],
    profilepic: {
        type:String,
        default: "male.png"
    },
    isVerified: {
        type: Boolean,
        default: false
        },
    verifyToken: {
        type: String
        },
    followers: [
        { type: mongoose.Schema.Types.ObjectId, 
          ref: "user" }
    ],
    following: [
        { type: mongoose.Schema.Types.ObjectId, 
          ref: "user" }
    ],// Define roles 
    role: {
        type: String,
        enum: ["user", "moderator", "admin"],
        default: "user"
    },
    isBanned: {
    type: Boolean,
    default: false
    },
    banUntil: {
    type: Date,
    default: null
    },
    banReason: {
    type: String,
    default: ""
    },
    isPrivate: {
    type: Boolean,
    default: false
    },
    followRequests: [
    { type: mongoose.Schema.Types.ObjectId, ref: "user" }
    ]
})

module.exports=mongoose.model('user',userSchema);