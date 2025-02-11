import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";  
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

{/*Increase the body size limit for JSON and URL-encoded data */}

app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));  

app.use(express.json());
app.use(cookieParser());
app.use(cors ({
    origin : "http://localhost:5173",
    credentials : true,
}))

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoutes);


connectDB(); 

app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
});


