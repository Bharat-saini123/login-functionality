import User from "../model/user.js";
const ForgotData=async(req,res)=>{
let {email,otp}= await req.body;
otp=Number(otp);
const findData=await User.findOne({email:email});
if(!findData||!otp){
    res.status(400).json("plz sent all the data");
}else{
    if(otp!==Number(findData.otp)){
        res.status(404).json("your otp is incorrect");
    
    }else{
    res.status(202).json("your otp is correct");
    
    }
}



}
export {ForgotData};