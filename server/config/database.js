import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Remove deprecated options
    });

    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
    // what it does is : it will exit the process with error code 1
    
  }
};

export default connectDB;
