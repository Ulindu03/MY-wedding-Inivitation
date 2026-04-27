const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files (index.html, styles.css, script.js, etc.)
app.use(express.static(__dirname));

const fs = require('fs');
const path = require('path');
const rsvpFile = path.join(__dirname, 'rsvp_counts.json');

app.post('/api/track-rsvp', (req, res) => {
  const { isAttending, guests } = req.body;
  let counts = { totalAcceptedRSVPs: 0, totalGuests: 0 };
  
  if (fs.existsSync(rsvpFile)) {
    try {
      counts = JSON.parse(fs.readFileSync(rsvpFile, 'utf8'));
    } catch (e) {
      console.error('Error reading rsvp file', e);
    }
  }

  if (isAttending) {
    counts.totalAcceptedRSVPs += 1;
    counts.totalGuests += parseInt(guests) || 0;
    fs.writeFileSync(rsvpFile, JSON.stringify(counts, null, 2));
  }

  res.json(counts);
});

// Transporter using Gmail and App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/send-email', async (req, res) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const mailOptions = {
    from: `Ulindu & Nethmi <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    html: html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Email backend server running on http://localhost:${PORT}`);
});
