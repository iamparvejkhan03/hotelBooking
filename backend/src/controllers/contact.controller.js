import ApiErrorHandler from "../utils/apiErrorHandler.js";
import sendMail from "../utils/nodemailer.js";
import "dotenv/config";

const contact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if(!name || !email || !message){
            return res.status(400).json(new ApiErrorHandler(false, 'All fields are required', 400));
        }

        const sent = await sendMail(`${process.env.SENDER_EMAIL}`, 'User Query', `<p>${message}</p>`);

        if(!sent){
            return res.status(500).json(new ApiErrorHandler(false, 'Message failed', 500));
        }

        return res.status(200).json({success:true, message:'Message sent. We\'ll reach out to you asap.'});
    } catch(error) {
        throw new Error(error);
    }
}

export { contact }