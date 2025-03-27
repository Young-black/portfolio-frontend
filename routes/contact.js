const express = require('express');
const nodemailer = require('nodemailer');
const config = require('../config/config');

const router = express.Router();

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: config.email.auth,
});

// Contact form endpoint
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Email options
  const mailOptions = {
    from: email, // Sender's email (from form)
    to: config.email.auth.user, // Your email (receiver)
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;