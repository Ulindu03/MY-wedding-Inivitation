const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files (index.html, styles.css, script.js, etc.)
app.use(express.static(__dirname));

// Transporter using Gmail and App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ulindu2003@gmail.com',
    pass: 'vdgv runn vwxr jhyf'
  }
});

app.post('/send-email', async (req, res) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const mailOptions = {
    from: 'Ulindu & Nethmi <ulindu2003@gmail.com>',
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Email backend server running on http://localhost:${PORT}`);
});
