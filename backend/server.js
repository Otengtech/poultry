import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Login page route
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login Page' });
});

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5000",
  "https://naya-axis-foods-backend.vercel.app",
  "https://poultry-ihc4.onrender.com",
  "http://localhost:5173",
  "https://nayaaxisfoods.vercel.app"
];

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// Utility function to read JSON files safely
const readJSONFile = (filePath, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading JSON file" });
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch {
      res.status(500).json({ message: "Invalid JSON format" });
    }
  });
};

// Dynamic endpoints for pages
const pages = ["home","products","about","contact","blog","team","review","order","faq","privacy"];
pages.forEach((page) => {
  app.get(`/content/${page}`, (req, res) => {
    const filePath = path.join(__dirname, `content/${page}.json`);
    readJSONFile(filePath, res);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
