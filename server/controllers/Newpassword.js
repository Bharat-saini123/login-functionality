import User from "../model/user.js";
import bcryt from "bcrypt";
const Newpassword = async (req, res) => {
  const {  repassword, email } = req.body;
  const phone=Number(email)||1;
const newpassword=req.body.password;
  const checkEmail = await User.findOne({$or:[{email:email},{phone:phone}]});
  if (!checkEmail) {
    res.status(400).json("your email is incorrect");
  } else {
    console.log("sahi hai");
    if (newpassword !== repassword) {
      res.status(404).json("your password not match retype password");
    } else {

        const haspPassword=await bcryt.hash(newpassword,10);
        const hashConfirmpassword=await bcryt.hash(repassword,10);
      const user = await User.updateOne(

       {$or:[{ email: email },{phone:phone}] },
        { password: haspPassword, confirmpassword: hashConfirmpassword },
        { new: true }
      
      
      
      );
      res.status(200).json("successful updated data");
    }
  }
};

export { Newpassword };
