const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error("PRODUCT ADD ERROR:", err);
    res.status(500).json({ message: "Product add failed" });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

// TOGGLE availability
router.put("/:id/toggle", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isAvailable = !product.isAvailable;
    await product.save();

    res.json({
      success: true,
      message: "Availability updated",
      isAvailable: product.isAvailable,
    });
  } catch (err) {
    console.error("TOGGLE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;
