const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  console.log("REQ BODY 👉", JSON.stringify(req.body, null, 2));

  try {
    const { items, address, payment, totalAmount, userId } = req.body;

    // 🔒 Backend safety
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!payment || !payment.method) {
      return res.status(400).json({ message: "Payment method required" });
    }

    // 💳 Normalize payment
    const finalPayment = {
      method: payment.method,
      status: payment.method === "cod" ? "pending" : "success",
      transactionId:
        payment.method === "cod" ? null : "TXN" + Date.now(),
    };

    const order = await Order.create({
      userId: userId || null,
      items,
      address,
      payment: finalPayment,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
  console.error("❌ ORDER SAVE ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Order failed",
    error: err.message,
  });
 }
});

// USER ORDER HISTORY
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
