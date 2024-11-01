import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://VishalSingh:Birendra2004@cluster0.sil2b.mongodb.net/Food-Delivery-Platform').then(()=>{console.log("DB connected")});
}