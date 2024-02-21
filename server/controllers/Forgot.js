import dotenv from "dotenv";
dotenv.config({
  path:"../.env",
})

import nodemailer from "nodemailer";
import User from "../model/user.js";
const Forgot = async (req, res) => {
  const { email } = await req.body;

  const checkEmailData = await User.findOne({ email: email });
  if (!checkEmailData) {
    res.status(404).json("you email is wrong plz sent right email");
  } else {
    let randomNumber = Math.floor(1000 + Math.random() * 9000);
    const updateUser = await User.updateOne(
      { email: email },
      { otp: randomNumber },
      { new: true }
    );
    setTimeout(async()=>{
      const updateUser = await User.updateOne(
        { email: email },
        { otp: 0 },
        { new: true }
      );
    },30000)
    res.status(200).json("data updated sucessfully");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    var mailOptions = {
      from: "sainibharat277@gmail.com",
      to: `${email}`,
      subject: "Sending Email using Node.js",
      text: `your verify otp is ${randomNumber}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
};

export { Forgot };
