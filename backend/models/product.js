const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Other'],
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPercent: {
    type: Number,
    default: 0
  },
  finalPrice: {
    type: Number
  },
  // 👇 Add this field so each product is linked to a user
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Calculate finalPrice before saving
productSchema.pre('save', function(next) {
  this.finalPrice = this.price - (this.price * this.discountPercent / 100);
  next();
});

module.exports = mongoose.model('Product', productSchema);
