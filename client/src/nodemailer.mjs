import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.OUTLOOK_USER,
    pass: process.env.OUTLOOK_PASS,
  },
});

// Configure the mailoptions object
const mailOptions = {
  from: process.env.OUTLOOK_USER,
  to: 'alejilal1@newpaltz.edu',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!',
};

// Send the email
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
//cslab@newpaltz.edu
