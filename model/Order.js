const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    order_id: {
        type: String,
        required: true
    },
    order_date: {
        type: Date,
        default: () => Date.now()
    },
    order_status: {
        type: String,
        default: 'placed'
    }
});

module.exports = mongoose.model('order', orderSchema);