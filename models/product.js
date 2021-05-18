const mongoose = require('mongoose'); 

const ProductSchema = new mongoose.Schema({
    serial: {
        type: String,
        required: true,
        unique: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        min: 1
    },
    date: {
      type: Date,
      default: Date.now
    }
},
)


module.exports = mongoose.model('product', ProductSchema);