// Required imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");
const mongoose = require("mongoose");


app.use(cors({
    origin: ['https://sports-theta-seven.vercel.app','http://localhost:3000'],
    credentials: true
}));


const User=require("./Models/user");
const { default: connectDB } = require("./config/connectDB");
const { default: sportModel } = require("./Models/Grounds");
const {default: sportModel1}=require("./Models/cricket")
const { default: sportModel2 } = require("./Models/badminton");
const { default: sportModel3 } = require("./Models/basketball");
const { default: sportModel4 } = require("./Models/hockey");  
const { default: sportModel5 } = require("./Models/tennis");
const { default: sportModel6 } = require("./Models/volleyball");


const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/json' })); // ✅ Needed for Stripe webhooks
require("dotenv").config();



//loginn mongoose 

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Compare password with hashed password
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

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
console.log(newUser);
    await newUser.save();

    return res.json({ success: true, message: "Registered successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});




// mongodb

app.get("/grounds", async (req, res) => {
  console.log("Fetching grounds...");
  try {
    const grounds = await sportModel.find();
    res.status(200).json({
      success: true,
      message: "Grounds fetched successfully",
      data: grounds
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch grounds",
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



//Feedback mails 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Feedback endpoint
app.post('/api/feedback', async (req, res) => {
  try {
    const data = req.body;
    console.log("Received feedback:", data);
    const { name, email, phone, date, feedbackType, rating, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !date || !feedbackType || !rating || !subject || !message) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    // Admin email (where all feedback will be sent)
    const adminEmail = process.env.ADMIN_EMAIL;

    // Email content
    const mailOptions = {
      from: `"Feedback System" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `New Feedback: ${subject}`,
      html: `
        <h2 style="color: #ff6b00;">New Feedback Received</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>From:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${name} (${email})</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Phone:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Booking Date:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Feedback Type:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${feedbackType}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Rating:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${rating}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Subject:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Message:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${message.replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666;">
          <small>This feedback was submitted on ${new Date().toLocaleString()}</small>
        </p>
      `,
      replyTo: email // So admin can reply directly to the user
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Feedback sent successfully!' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    res.status(500).json({ error: 'Failed to send feedback' });
  }
});

// ✅ Start server
connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`server started sucessfully at http://localhost:${port}`)
    })
})
