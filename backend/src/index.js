import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";  
import cors from "cors";

import path from "path";

import authRoute from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

import { connectDB } from "./lib/db.js";

dotenv.config(); 

const PORT = process.env.PORT;

const __dirname = path.resolve();

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

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB(); 
});


