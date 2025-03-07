const nodemailer = require('nodemailer');
require('dotenv').config();
const Campaign = require('../models/Campaign');

const transporter = nodemailer.createTransport({
   host: "smtp.mail.me.com",
   port: 587,
   secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendApprovalEmail = async (campaignId) => {
  try {
    const campaign = await Campaign.findById(campaignId).populate('creator');
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const userEmail = campaign.creator.email;
    const campaignTitle = campaign.title;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Campaign Approval',
      body: `Your campaign "${campaignTitle}" has been approved!
      Login to check the status`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', userEmail);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};