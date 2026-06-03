require("dotenv").config();
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.GOOGLE_APP_PASS
    }
})

const sendContactEmail = async (contactData) => {
    const { name, email, subject, message } = contactData;

    await transporter.sendMail({
        from: email,
        to: process.env.EMAIL,
        subject: `New Contact Message: ${subject}`,
        html: `
            <h2>New Contact Message</h2>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>

            <h3>Message:</h3>
            <p>${message}</p>
        `,
    });
};

module.exports = {
    sendContactEmail
}