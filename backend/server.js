// backend/server.js
import express from 'express'
import multer from 'multer' // <-- INSTALL THIS: npm install multer
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

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

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // folder to save files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Your route WITH multer middleware
app.post('/api/Create-review', upload.single('avatar'), (req, res) => {
  console.log('File:', req.file);
  console.log('Body:', req.body);
  // Save to DB here
  res.json({ success: true, review: req.body });
});

// parse JSON bodies
app.use(express.json());

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});