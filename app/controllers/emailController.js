const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_SECRET,
    pass: process.env.PASSWORD_SECRET,
  },
  secure: true,
});

const sendEmail = (req, res) => {
  const { to, subject, text } = req.body;
  const mailData = {
    from: "ilhaampraas31@gmail.com",
    to: to,
    subject: subject,
    text: text,
    html: `<b>Hey there</b>Thanks`,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({
      message: "mail sending",
    });
  });
};

module.exports = {
  sendEmail,
};
