import mongoose from "mongoose";

const dbConnect = async () => {
    try{
        const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);

        if(connect){
            console.log('Database connection established');
        }
    }catch(error){
        throw new Error(error.message);
    }
}

dbConnect();

export default dbConnect;