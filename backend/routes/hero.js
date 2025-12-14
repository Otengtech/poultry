import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    heroMessages: [
      {
        title: "Fresh Eggs, Every Day",
        description: "Nutritious farm-fresh eggs delivered straight to your doorstep."
      },
      {
        title: "Quality You Can Trust",
        description: "Carefully sourced from healthy, well-fed hens."
      },
      {
        title: "Naturally Healthy & Delicious",
        description: "Packed with protein, vitamins, and essential nutrients."
      }
    ]
  });
});

export default router;
