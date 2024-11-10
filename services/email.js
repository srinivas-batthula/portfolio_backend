const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

async function createTransporter() {
    // Create a transporter using SMTP or a third-party service (e.g., Gmail, SendGrid)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your preferred email service
        auth: {
            user: process.env.EMAIL_USER, // Sender's email
            pass: process.env.EMAIL_PASS, // Sender's email password or App password
        },
    });

    return transporter;
}

async function sendEmail(body) {
    const { name, to, txt } = body;
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_USER2 = process.env.EMAIL_USER2;

    // Create the transporter
    const transporter = await createTransporter();

    // First email: To the user thanking them for contacting
    const firstEmailSubject = 'An E-mail from ~Srinivas Batthula';
    const firstEmailText = `Thank you '${name}' for contacting me.\nYour response has been recorded.\n\t~Srinivas Batthula`;
    const firstEmailOptions = {
        from: EMAIL_USER,
        to: to,
        subject: firstEmailSubject,
        text: firstEmailText,
    };

    // Second email: To admin or personal email address with user message
    const secondEmailSubject = 'From Personal Portfolio';
    const secondEmailText = `A new user, ${name}, messaged you: \n${txt}`;
    const secondEmailOptions = {
        from: EMAIL_USER,
        to: EMAIL_USER2,
        subject: secondEmailSubject,
        text: secondEmailText,
    };

    try {
        // Send the first email (to the user)
        await transporter.sendMail(firstEmailOptions);

        // Send the second email (to admin/personal email)
        await transporter.sendMail(secondEmailOptions);

        return { status: 'success', message: 'Emails sent successfully!' };
    } catch (error) {
        return { status: 'fail', error: 'Failed to send email.' };
    }
}

module.exports = { sendEmail };
