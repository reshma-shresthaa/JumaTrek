import mongoose from "mongoose";


const connectDb = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URL);    
        console.log("connected to database");
    } catch (error) {
        console.log("cannot connect to the database")
    }
}

export default connectDb