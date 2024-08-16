import mongoose from 'mongoose';

let isConnected = false; // track connection status

export const connectToDatabase = async () => {
  if (isConnected) {
    return; // use existing connection
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};
