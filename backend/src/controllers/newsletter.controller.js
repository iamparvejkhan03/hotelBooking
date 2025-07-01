import Newsletter from "../models/newsletter.model.js";
import ApiErrorHandler from "../utils/apiErrorHandler.js";

const subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email){
            return res.status(400).json(new ApiErrorHandler(false, 'No email provided', 400));
        }

        const subscription = await Newsletter.create({email});

        if(!subscription){
            return res.status(500).json(new ApiErrorHandler(false, 'subscription failed', 500));
        }

        return res.status(200).json({success:true, message:'Subscribed', email});
    } catch (error) {
        throw new Error(error);
    }
}

export { subscribe, }