import express from "express";
import cors from "cors";
import heroRoute from "./routes/hero.js";
import newsletterRoute from "./routes/newsletter.js";
import contactRoute from "./routes/contact.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000", // dev frontend
  "https://naya-axis-foods-frontend.vercel.app", // prod frontend
];

// ✅ Configure CORS globally
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman or server requests
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

// parse JSON bodies
app.use(express.json());

// Routes
app.use("/hero", heroRoute);
app.use("/subscribe", newsletterRoute);
app.use("/contact", contactRoute)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});