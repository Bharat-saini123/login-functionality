import User from "../model/user.js";
const Signup = async (req, res) => {
  let { username, email, phone, password, confirmpassword } = await req.body;

  phone = Number(phone);

  if (!username || !email || !phone || !password || !confirmpassword) {
    res.status(404).json("plz filled all the data");
  } else {
    const checkEmailData = await User.findOne({ email: email });
    if (checkEmailData) {
      res.status(400).json("your email already exist");
    } else {
      const checkPhoneNumber = await User.findOne({ phone: phone });
      if (checkPhoneNumber) {
        res.status(408).json("your number already exist");
      } else {
        const newEmailCheck = email.slice(-10);
        if (newEmailCheck.toLowerCase() !== "@gmail.com") {
          res.status(412).json("your email format not valid");
        } else {
          let checkPhoneLength = phone.toString().length;
          let lastTenCharacterPhone = phone.toString().slice(0, 2);
          if (
            !(
              (checkPhoneLength === 10 &&
                !(
                  lastTenCharacterPhone === "+91" ||
                  lastTenCharacterPhone === "91"
                )) ||
              (checkPhoneLength === 12 && lastTenCharacterPhone === "91") ||
              (checkPhoneLength === 13 && lastTenCharacterPhone === "+91")
            )
          ) {
            res.status(416).json("your number is wrong");
          } else {
            if (password !== confirmpassword) {
              res.status(420).json("your password not match confirm password");
            } else {
              const user = await new User({
                username,
                email,
                phone,
                password,
                confirmpassword,
              });
              const token= await user.generateToken();
              await user.save();
              res.status(200).json("successful register data");
            }
          }
        }
      }
    }
  }
};
export { Signup };
