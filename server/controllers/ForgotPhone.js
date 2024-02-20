import Twilio from "twilio";
import User from "../model/user.js";
const accountSid = "AC5e3071c96db6e2a1b41b7efc6b26ea79";
const authToken = "265d8f3456639244d4f6c072b2a34639";

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
        from: "+12562911119", // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));

  }
};
export { ForgotPhone };
