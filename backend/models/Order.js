const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  weight: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const deliveryAddressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  orderItems: [orderItemSchema],
  shippingAddress: deliveryAddressSchema,
  paymentMethod: { type: String, enum: ['COD', 'Online'], required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  itemsPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  orderStatus: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
  trackingId: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
