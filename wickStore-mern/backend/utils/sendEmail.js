const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create the transporter using SMTP settings
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,         // SMTP server hostname
        port: process.env.SMTP_PORT,         // SMTP server port (usually 587 for TLS)
        secure: process.env.SMTP_SECURE === 'true', // Set to 'true' for secure connections (TLS)
        auth: {
            user: process.env.SMTP_MAIL,     // Your email (SMTP username)
            pass: process.env.SMTP_PASSWORD, // Your email password (SMTP password)
        },
    });

    // Define the email options
    const mailOptions = {
        from: process.env.SMTP_MAIL,         // Sender email
        to: options.email,                   // Recipient email
        subject: options.subject,            // Email subject
        html: options.message,               // Email body (HTML)
    };

    try {
        // Send the email using the transporter
        const info = await transporter.sendMail(mailOptions);
        console.log('Email Sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
