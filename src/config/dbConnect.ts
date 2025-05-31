import mongoose from 'mongoose';

// MongoDB connection logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL!);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

export default  connectDB;