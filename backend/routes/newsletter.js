import express from "express";

const router = express.Router();

// POST /subscribe
router.post("/", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // TODO: Add email to your database or mailing list
  console.log("New subscription:", email);

  return res.status(200).json({ message: "Subscribed successfully!" });
});

export default router;
