const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true
  },
  cuisine: {
    type: String,
    required: [true, 'Please add a cuisine type']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must not be more than 5']
  },
  deliveryTime: {
    type: Number,
    required: [true, 'Please add estimated delivery time in minutes']
  },
  priceRange: {
    type: String,
    enum: ['$', '$$', '$$$', '$$$$'],
    required: [true, 'Please add a price range']
  },
  image: {
    type: String,
    default: 'default.jpg'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);