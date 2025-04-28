import mongoose from "mongoose";

export async function connectDB() {
    try {
      await mongoose.connect(`${process.env.MONGO_URL!}/NextAuth`); 
       const connect = mongoose.connection;
      connect.on('connected', () => {
          console.log("Connected to MongoDB");
      })

      connect.on('error', (err) => {
          console.log("Error connecting to MongoDB:", err);
      })
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}