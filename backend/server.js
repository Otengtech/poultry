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
      // Allow server-to-server, Postman, Vercel
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("Blocked by CORS:", origin);
      return callback(null, true); // <-- IMPORTANT
    },
    methods: ["GET", "POST", "OPTIONS"],
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
   CREATE REVIEW (IMAGE UPLOAD)
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
    const { customerInfo, items, totalAmount, orderNumber } = req.body;

    /* ---------- BASIC VALIDATION ---------- */
    if (!customerInfo?.name || !customerInfo?.phone) {
      return res.status(400).json({
        success: false,
        message: "Customer name and phone are required",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    /* ---------- ENSURE REQUIRED SCHEMA ---------- */
    const payload = {
      orderNumber:
        orderNumber ||
        `ORD-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase()}`,

      customerInfo: {
        name: customerInfo.name,
        phone: customerInfo.phone,
        email: customerInfo.email || "",
        address: customerInfo.address || "",
        deliveryType: customerInfo.deliveryType || "pickup",
        deliveryDate: customerInfo.deliveryDate || null,
        paymentMethod: customerInfo.paymentMethod || "cash",
      },

      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
        totalPrice: Number(item.totalPrice),
        image: item.image || "",
        category: item.category || "",
      })),

      totalAmount: Number(totalAmount),
    };

    /* ---------- FORWARD TO FRIEND API ---------- */
    const response = await axios.post(
      `${process.env.FRIEND_ORDER_API}/order`, // 👈 your friend’s endpoint
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer`, // if required
        },
        timeout: 10000,
      }
    );

    res.status(201).json({
      success: true,
      message: "Order forwarded successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Order forward error:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Failed to forward order",
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
