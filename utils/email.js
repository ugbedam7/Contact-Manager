const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: process.env.SMTP_PORT,
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  secure: true,
  debug: true
});

const addContactEmail = async (email) => {
  // Send OTP
  const mailOptions = {
    from: 'clickviralng@gmail.com',
    to: email,
    subject: 'New Contact Added',
    html: `<p style="font-size: 18px"><strong>Be notified</strong> that your contact details have been added.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: 'New contact notification sent to your email' };
  } catch (err) {
    throw new Error('Error sending email: ' + err.message);
  }
};

module.exports = addContactEmail;
