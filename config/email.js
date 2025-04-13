const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use another email provider (e.g., Outlook, Yahoo)
    auth: {
        user: 'calapancityfmo@gmail.com', // Replace with your email
        pass: 'cvmv irvp jpdk gget'   // Replace with your app password (not your real password)
    }
});

const sendViolationNotification = async (toEmail, userName, violationType, details) => {
    try {
        const mailOptions = {
            from: 'calapancityfmo@gmail.com',
            to: toEmail,
            subject: 'Violation Notification',
            html: `
                <p>Hello <strong>${userName}</strong>,</p>
                <p>You have been issued a violation for: <strong>${violationType}</strong>.</p>
                <p>Details: ${details}</p>
                <p>Please take necessary action.</p>
                <p>Regards, <br> Fisheries Monitoring System</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to', toEmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendViolationNotification;
