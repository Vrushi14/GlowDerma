const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to GlowDerma - Your Skincare Journey Begins Here");
});

app.get("/about", (req, res) => {
  res.send(`
    <h3>
      We are a premium skincare brand committed to bringing you
      dermatologist-approved, clean beauty products
    </h3>
  `);
});

app.get("/contact", (req, res) => {
  res.json({
    email: "care@glowderma.com",
    instagram: "http://instagram.com/glowderma",
    consultation: "http://glowderma.com/book-appointment",
  });
});

app.get("/products", (req, res) => {
  res.json([
    {
      name: "HDot & Key Ceramides Moisturizer with Hyaluronic for Intense Moisturizing and Skin Strengthening",
      price: "$30",
      description:
        "Intense hydration, strengthens skin, restores moisture, smooths texture, plumps skin, nourishes deeply, hyaluronic, ceramides, softens, non-greasy.",
    },
    {
      name: "NIVEA Soft Light Moisturizer",
      price: "$25",
      description:
        "Lightweight, fast-absorbing, softens skin, refreshing, smooth, moisturizing, non-greasy, hydrates, gentle, all-day care.",
    },
    {
        name: "Neutrogena Hydro Boost Hyaluronic Acid Face Moisturizer.",
        price: "$20",
        description:
          "Hydrating, boosts moisture, lightweight, non-oily, refreshing, plumps skin, smooth texture, hyaluronic acid, softens, breathable.",
      },
  ]);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});