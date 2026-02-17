const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
      enum: ["Pizza", "Burger", "Indian", "Dessert", "Drinks","Biryani","Dosa","Butter Chicken", "Paneer","Salad","Cake","Nan","chinese","rolls"],
    },
    image: {
      type: String, // image URL for now
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
