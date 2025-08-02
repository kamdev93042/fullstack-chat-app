import express from "express";  
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

import { app, server } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json()); //adding middleware--->allow us  to extract the json data out of the body
app.use(cookieParser()); //this will basically allow us to parse the cookie

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); //making dist foldera as static assets



  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend", "dist", "index.  html"));  //For any routes making index.hmtl file as entry point for the react application
  })
}

app.use(express.urlencoded({ extended: true }));

server.listen(PORT , ()=>{
    console.log("server is running on PORT:" + PORT);
    connectDB()
});
