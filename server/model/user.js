import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
    path:"../.env"
});

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    confirmpassword:{
        type:String,
        required:true,
        trim:true,
    },
    otp:{
        type:Number,
        default:"",
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,
                default:"",
            }
        }
    ]
})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
        this.confirmpassword=await bcrypt.hash(this.confirmpassword,10);
    }
    next();

})
userSchema.methods.generateToken=async function(){
const token=await jsonwebtoken.sign({_id:this._id.toString()},process.env.SECRET_KEY);
this.tokens=this.tokens.concat({token:token});
return token;
}
const User=new mongoose.model("User",userSchema);

export default User;