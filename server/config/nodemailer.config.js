'use strict';
const nodemailer = require("nodemailer");
const config = require("./auth.config");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
    host: "smtp.libero.it",
    port: 465 ,
    secure: true,
    auth: {
      user: user,
      pass: pass,
    },
});

const testConnection =()=>{
    transport.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
}

const sendConfirmationEmail = (username, email, confirmationUrl) => {
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${username}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=${confirmationUrl}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };


module.exports = {testConnection,sendConfirmationEmail}