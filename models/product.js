const mongoose = require('mongoose'); 

const ProductSchema = new mongoose.Schema({
    serial: {
        type: String,
        required: true,
        unique: true
    },
    Company: {
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
}, { autoCreate : true })


module.exports = mongoose.model('product', ProductSchema);