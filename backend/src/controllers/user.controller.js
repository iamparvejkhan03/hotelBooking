import User from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        if(!fullName || !email || !phone || !password){
            res.json({success:false, message:'All fields are required for registration.'});
        }

        const user = await User.create({fullName, email, phone, password});

        if(user){
            res.json({success:true, message:'User created successfully.', data:user});
        }else{
            res.json({success:false, message:'Some error occured while creating the user.'});
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export {registerUser}