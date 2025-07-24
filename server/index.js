import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import enquiryRouter from "./App/routes/web/enquiryRoutes.js";
import cors from 'cors';

configDotenv();
let app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/website/enquiry',enquiryRouter);

mongoose.connect(process.env.DBURL).then(()=>{
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 3000,()=>{
       console.log("server is running");
    })
}).catch((err)=>{
    console.log("Error occured while connecting MongoDB",err);
})