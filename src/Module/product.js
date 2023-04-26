const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  slug: {
    type: String,
    require: true,
    unique: true
  },
  price: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    require: true,
    trim: true
  },
  quentity: {
    type: Number,
    required: true
  }
  ,
  offers: { type: Number },
  pictures: [
    { img: { type: String } }
  ],
  reviews: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      review: String
    }
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'catogery',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true

  },
  updatedAt: Date

},
  {
    timestamps: true
  })

module.exports = mongoose.model('products', ProductSchema)