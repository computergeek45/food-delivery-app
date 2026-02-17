const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required: false,
   },

    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    address: {
      name: String,
      phone: String,
      street: String,
      city: String,
      pincode: String,
    },

    payment: {
      method: {
        type: String,
        enum: ["cod", "gpay", "card"],
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "success"],
        default: "pending",
      },
      transactionId: String,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      default: "placed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
