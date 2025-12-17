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
// Create order route - No image upload needed
app.post('/order', async (req, res) => {
  try {
    const {
      customerInfo,
      items,
      totalAmount,
      orderNumber,
      status = 'pending'
    } = req.body;

    console.log("Received order data:", req.body); // For debugging

    // Validate required fields
    if (!customerInfo || !customerInfo.name || !customerInfo.phone) {
      return res.status(400).json({
        success: false,
        message: "Customer name and phone are required"
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item"
      });
    }

    // Validate items structure
    for (const item of items) {
      if (!item.name || !item.price || !item.quantity || !item.image) {
        return res.status(400).json({
          success: false,
          message: "Each item must have name, price, quantity, and image"
        });
      }
    }

    // Create new order
    const newOrder = new Order({
      customerInfo: {
        name: customerInfo.name,
        phone: customerInfo.phone,
        email: customerInfo.email || '',
        address: customerInfo.address || '',
        deliveryType: customerInfo.deliveryType || 'pickup',
        paymentMethod: customerInfo.paymentMethod || 'cash'
      },
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
        totalPrice: parseFloat(item.totalPrice) || (parseFloat(item.price) * parseInt(item.quantity)),
        images: item.image ? [item.image] : [], // Direct Cloudinary URL
        category: item.category || 'General',
      })),
    });

    // Save order to database
    const savedOrder = await newOrder.save();

    console.log("Order saved successfully:", savedOrder.orderNumber);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder
    });

  } catch (error) {
    console.error("Error creating order:", error);
    
    // Handle duplicate order number
    if (error.code === 11000 || error.message.includes('duplicate key')) {
      return res.status(400).json({
        success: false,
        message: "Order number already exists. Please try again."
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
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
