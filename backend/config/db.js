import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
        });
        console.log(`Connected to Mongodb at: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
		process.exit(1);
    }
	
};

export default connectToDb;
