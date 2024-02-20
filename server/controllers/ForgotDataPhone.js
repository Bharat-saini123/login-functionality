import User from "../model/user.js";
const ForgotDataPhone=async(req,res)=>{
    let {phone,otp}=req.body;
    phone=phone.toString().slice(-10);
    phone=Number(phone);
    otp=Number(otp);
    const checkPhoneData=await User.findOne({phone:phone});
    if(!checkPhoneData){
        res.status(400).json("your number is incorrect");
        
    }else{
       if(otp!==Number(checkPhoneData.otp)){
res.status(408).json("your otp is incorrect");
       }else{
        res.status(200).json("your otp is correct");
       }
        
    }


}
export {ForgotDataPhone};