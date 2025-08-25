const mongoose = require('mongoose');

const fooditemSchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    options: [
        {
            size: { type: String, required: true },
            price: { type: mongoose.Schema.Types.Mixed, required: true }
        }
    ]


});

module.exports = mongoose.model('Food_items', fooditemSchema);