// backend/server.js
import express from 'express'
import multer from 'multer' // <-- INSTALL THIS: npm install multer
import cors from 'cors'
import cloudinary from 'cloudinary'

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

const upload = multer({ storage: multer.memoryStorage() });

app.post("/Create-review", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Reviewer image is required" });
  }

  const uploadResult = await cloudinary.uploader.upload_stream(
    { folder: "reviews" },
    (error, result) => {
      if (error) throw error;

      res.status(201).json({
        success: true,
        review: {
          name: req.body.name,
          email: req.body.email,
          content: req.body.content,
          rating: Number(req.body.rating),
          image: result.secure_url,
        },
      });
    }
  ).end(req.file.buffer);
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});