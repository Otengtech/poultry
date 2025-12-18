// backend/server.js
import express from "express";
import cors from "cors";
import multer from "multer";
import cloudinary from "cloudinary";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  "https://naya-axis-foods-frontend.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("Blocked by CORS:", origin);
      return callback(null, true); // allow anyway (as requested)
    },
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

/* =======================
   CLOUDINARY CONFIG
======================= */
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* =======================
   MULTER (MEMORY STORAGE)
======================= */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

/* =======================
   FRIEND API BASE URL
======================= */
const FRIEND_API_BASE_URL = process.env.FRIEND_API_BASE_URL;
// example: https://friend-api.vercel.app

/* =======================
   CREATE REVIEW
======================= */
app.post("/create-review", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Reviewer image is required",
      });
    }

    cloudinary.v2.uploader
      .upload_stream({ folder: "reviews" }, (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Image upload failed",
          });
        }

        res.status(201).json({
          success: true,
          review: {
            name: req.body.name || "Anonymous",
            email: req.body.email || "",
            content: req.body.content || "",
            rating: Number(req.body.rating) || 5,
            image: result.secure_url,
          },
        });
      })
      .end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =======================
   CREATE ORDER (FORWARD TO FRIEND API)
======================= */
app.post("/order", async (req, res) => {
  try {
    const response = await axios.post(
      `${FRIEND_API_BASE_URL}/order`,
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.status(201).json({
      success: true,
      message: "Order forwarded successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Order forward error:", error?.response?.data || error.message);

    res.status(error.response?.status || 500).json({
      success: false,
      message: "Failed to create order",
      error: error.response?.data || error.message,
    });
  }
});

/* =======================
   FETCH ALL ORDERS (PROXY)
======================= */
app.get("/orders", async (req, res) => {
  try {
    const response = await axios.get(
      `${FRIEND_API_BASE_URL}/orders`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Fetch orders error:", error?.response?.data || error.message);

    res.status(error.response?.status || 500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

/* =======================
   DELETE ORDER (PROXY)
======================= */
app.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.delete(
      `${FRIEND_API_BASE_URL}/orders/${id}`
    );

    res.json({
      success: true,
      message: "Order deleted successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Delete order error:", error?.response?.data || error.message);

    res.status(error.response?.status || 500).json({
      success: false,
      message: "Failed to delete order",
      error: error.response?.data || error.message,
    });
  }
});

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
