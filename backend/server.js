// Required imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
const mongoose = require("mongoose");





const User=require("./Models/user");
const { default: connectDB } = require("./config/connectDB.js");
const { default: sportModel } = require("./Models/Grounds.js");
const {default: sportModel1}=require("./Models/cricket.js")
const { default: sportModel2 } = require("./Models/badminton.js");
const { default: sportModel3 } = require("./Models/basketball.js");
const { default: sportModel4 } = require("./Models/hockey.js");  
const { default: sportModel5 } = require("./Models/tennis.js");
const { default: sportModel6 } = require("./Models/volleyball.js");
const Booking = require("./Models/booking");
const Feedback=require("./Models/feedback.js")


// Initialize environment variables


const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/json' })); // ✅ Needed for Stripe webhooks
require("dotenv").config();


app.use(cors({
    origin: ['https://sports-theta-seven.vercel.app/','http://localhost:3000'],
    credentials: true
}));

console.log("CORS enabled for specific origins");






//loginn mongoose 

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


// ✅ Registration route

app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.json({ success: true, message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});





app.get("/grounds", async (req, res) => {
  console.log("Fetching grounds grounds...");
  try {
    const ground = await sportModel.find();
    res.status(200).json({
      success: true,
      message: " grounds fetched successfully",
      data:ground
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch  grounds",
      error: error.message
    });
  }
});

//cricket

app.get("/cricket", async (req, res) => {
  console.log("Fetching cricket grounds...");
  try {
    const cricket = await sportModel1.find();
    
    res.status(200).json({
      success: true,
      message: "Cricket grounds fetched successfully",
      data: cricket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cricket grounds",
      error: error.message
    });
  }
});



//badminton

app.get("/badminton", async (req, res) => {
  console.log("Fetching badminton grounds...");
  try {
    const badminton = await sportModel2.find();
    res.status(200).json({
      success: true,
      message: "Badminton grounds fetched successfully",
      data: badminton
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch badminton grounds",
      error: error.message
    });
  }
});



//basketball

app.get("/basketball", async (req, res) => {
  console.log("Fetching basketball grounds...");
  try {
    const basketball = await sportModel3.find();
    res.status(200).json({
      success: true,
      message: "Basketball grounds fetched successfully",
      data: basketball
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch basketball grounds",
      error: error.message
    });
  }
});


///hockey

app.get("/hockey", async (req, res) => {
  console.log("Fetching hockey grounds...");
  try {
    const hockey = await sportModel4.find();
    res.status(200).json({
      success: true,
      message: "Hockey grounds fetched successfully",
      data: hockey
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hockey grounds",
      error: error.message
    });
  }
});



//tennis

app.get("/tennis", async (req, res) => {    
  console.log("Fetching tennis grounds...");
  try {
    const tennis = await sportModel5.find();
    res.status(200).json({
      success: true,
      message: "Tennis grounds fetched successfully",
      data: tennis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tennis grounds",
      error: error.message
    });
  }
});


//volleyball

app.get("/volleyball", async (req, res) => {
  console.log("Fetching volleyball grounds...");
  try {
    const volleyball = await sportModel6.find();
    res.status(200).json({
      success: true,
      message: "Volleyball grounds fetched successfully",
      data: volleyball
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch volleyball grounds",
      error: error.message
    });
  }
});




//Mails to users
app.post("/send-email", async (req, res) => {
  const { email, username, groundName, sport, date, slot } = req.body;

  // Validate input
  if (!email || !username || !groundName || !sport || !date || !slot) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    if (!process.env.ADMIN_EMAIL || !process.env.EMAIL_PASS) {
      console.error("Missing email environment variables.");
      return res.status(500).json({ message: "Server email config error" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Sports Booking Team" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "Sports Ground Booking Confirmation",
      html: `
        <h3>Hello ${username},</h3>
        <p>Thank you for booking with us!</p>
        <p><strong>Ground:</strong> ${groundName}</p>
        <p><strong>Sport:</strong> ${sport}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Slot:</strong> ${slot}</p>
        <br/>
        <p>Regards,<br/>Sports Booking Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email send error:", error.message);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

//getting data from booking to show history from user 


app.get('/profile/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const bookings = await Booking.find({ email }); // returns an array
    if (bookings.length === 0) {
      return res.status(200).json({ message: "No bookings found", bookings: [] });
    }

    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});





//save Booking endpoint

app.post("/booking", async (req, res) => {
  try {
    const bookingData = req.body;
    const booking = new Booking(bookingData);
    await booking.save();
    res.status(201).json({ message: "Booking saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save booking" });
  }
});




app.post('/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});



// ✅ Start server
connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`server started sucessfully at http://localhost:${port}`)
    })
})
