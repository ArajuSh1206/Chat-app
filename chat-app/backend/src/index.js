import express from "express";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config(); // Added missing semicolon

const app = express();
const PORT = process.env.PORT || 5173;

app.use(express.json());
app.use("/api/auth", authRoute);

connectDB(); // Call this before starting the server

app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
});
