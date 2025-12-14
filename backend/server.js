import express from "express";
import cors from "cors";
import heroRoute from "./routes/hero.js";
import newsletterRoute from "./routes/newsletter.js";

const app = express();

app.use(cors());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173", // dev frontend
  "https://naya-axis-foods-frontend.vercel.app", // prod frontend
];

// ✅ Configure CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman or server requests
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"], // allow OPTIONS
    credentials: true,
  })
);

// Handle preflight requests for all routes
app.options("/*", cors());

app.use(express.json());
app.use("/hero", heroRoute);
app.use("/subscribe", newsletterRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
