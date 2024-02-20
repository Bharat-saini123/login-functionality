
import User from "../model/user.js";
import bcrypt from "bcrypt";
const Signin=async(req,res)=>{

let {email,password,phone}=await req.body;

if((email&&!phone)||(!email&&!phone)){
    if(!email||!password){
        res.status(400).json("plz filled all the data");
    }else{
        const checkEmailData=await User.findOne({email:email});
        if(!checkEmailData){
            res.status(404).json("email invalid")
        }else{
            const hashPassword=await bcrypt.compare(password,checkEmailData.password);
            if(!hashPassword){
                res.status(412).json("password invalid");
            }else{
                const token=await checkEmailData.generateToken();
                await checkEmailData.save();
                res.status(200).json("you successful login");
            }
        }
    }
}else{
    phone=Number(phone);
    if(!phone||!password){
        res.status(400).json("plz filled all the data");
    }else{
        const checkPhoneData=await User.findOne({phone:phone});
        if(!checkPhoneData){
            res.status(404).json("invalid data")
        }else{
            const hashPassword=await bcrypt.compare(password,checkPhoneData.password);
if(!hashPassword){
    res.status(412).json("password invalid");
}else{
    const token=await checkPhoneData.generateToken();
    await checkPhoneData.save();
    res.status(200).json("you successful login");
}
        }
    }
}

}
export {Signin};