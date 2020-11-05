const express = require('express');
const { model } = require('mongoose');
const Order = require('../../model/Order');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        return res.render('home', { orders });
    } catch (error) {
        log.error(error.message);
        return res.status(400).json({ message: messages.INCORRECT_REQUEST_BODY_DATA });
    }
});

module.exports = router;