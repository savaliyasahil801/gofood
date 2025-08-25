const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    order_data: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Orders', orderSchema); 