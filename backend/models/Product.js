const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  weight: { type: String, required: true }, // e.g., '250g', '500g', '1kg'
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  inStock: { type: Boolean, default: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String] },
  category: { type: String, required: true }, // e.g., 'Mango', 'Gongura', 'Non-Veg', etc.
  image: { type: String }, // Backwards compatibility for single image
  images: { type: [String] }, // Paths to images
  price: { type: Number },
  weight: { type: String, default: '250g' },
  stock: { type: Number, default: 100 },
  variants: [variantSchema],
  isBestSeller: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
