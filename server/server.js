import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import connectDB from "./db.js";  // Import the connection file
import "./passport.js";
import authRoute from "./routes/auth.js";
import notesRoute from "./routes/notesRoute.js";
import dotenv from "dotenv";
import { CLIENT_URL } from "./clientURL.js";

dotenv.config();

connectDB();  // Call the function to connect to the database

const app = express();

app.use(express.json());  // Add middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // URL Body Parser

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  origin: `${CLIENT_URL}`,
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use("/auth", authRoute);
app.use(notesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
