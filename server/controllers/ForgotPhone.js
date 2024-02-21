import dotenv from "dotenv";
dotenv.config({
  path:"../.env",
})
import Twilio from "twilio";
import User from "../model/user.js";
const accountSid = process.env.USER_ACCOUNT_ID;
const authToken = process.env.USER_ACCOUNT_PHONE;

const ForgotPhone = async (req, res) => {
  let { phone } = req.body;
  phone = Number(phone);
  const phoneLength = phone.toString().length;
  let lastCharPhone = phone.toString().slice(-10);
  const newNumber=Number(lastCharPhone);

  const checkPhoneData = await User.findOne({ phone: newNumber });
  if (!checkPhoneData) {
    res.status(404).json("your number is incorrect");
  } else {
    let randomNumber = Math.floor(1000 + Math.random() * 9000);
    const updatedData=await User.updateOne({phone:newNumber},{otp:randomNumber},{new:true});
    setTimeout(async()=>{
      const updateUser = await User.updateOne(
        { email: email },
        { otp: 0 },
        { new: true }
      );
    },30000);
    res.status(200).json("sent otp");
    const client = new Twilio(accountSid, authToken);
    client.messages
      .create({
        body: `your verify otp is ${randomNumber}`,
        to: `+91${newNumber}`, // Text your number
        from: process.env.FROM_NUMBER, // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));

  }
};
export { ForgotPhone };
