import app from "./app.js";
import 'dotenv/config';
import dbConnect from "./db/dbConnect.js";

const PORT = process.env.PORT;

dbConnect().then(() => {
    app.listen(PORT, () => console.log(`Server is running on localhost port ${PORT}`));
})