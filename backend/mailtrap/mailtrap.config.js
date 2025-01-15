//const Nodemailer = require("nodemailer");
//const { MailtrapTransport } = require("mailtrap");

import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

export const transport = Nodemailer.createTransport( // mailTrapClient == transport ( there is no client in my code, transport )
  MailtrapTransport({
    token: TOKEN,
  })
);

export const sender = {
  address: "hello@demomailtrap.com",
  name: "Auth Tuto App",
};
/*const recipients = [
  "pubuduakshan04@gmail.com",
];*/

/*transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);*/ 