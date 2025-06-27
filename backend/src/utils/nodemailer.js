import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: `${process.env.SMTP_HOST}`,
    port: `${process.env.SMTP_PORT}`,
    secure: false,
    auth: {
        user: `${process.env.SMTP_USER}`,
        pass: `${process.env.SMTP_PASSWORD}`
    }
});

const sendMail = async (to, subject, html) => {
    try {
        return await transporter.sendMail({
            from: `"InstaStay" <${process.env.SENDER_EMAIL}>`,
            to: `${to}`,
            subject: `${subject}`,
            html: `${html}`,
        })
    } catch (error) {
        throw new Error(error);
    }
}

export default sendMail;