import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "digivantetesing@gmail.com",
    pass: "oumdrufhroerflml",
  },
});

const sendEmail = (data) => {
  const { name, number, email, message } = data;

  const mailOptions = {
    from: "your-gmail-account@gmail.com",
    to: "swethasakthi927@gmail.com",
    subject: "New message from Portfolio contact form",
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Number:</strong> ${number}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

app.post("/submit-form", (req, res) => {
  const formData = req.body;
  sendEmail(formData);
  res.sendStatus(200);
});

export { client };

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
