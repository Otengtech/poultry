import express from "express";

const router = express.Router();

// POST /contact
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  // Validate inputs
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All input fields are required" });
  }

  // TODO: Save to database or send email
  console.log("New contact message received:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  return res.status(200).json({ message: "Message sent successfully!" });
});

export default router;
