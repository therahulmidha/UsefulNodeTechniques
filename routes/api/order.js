const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Order = require('../../model/Order');
const messages = require('../../constants/messages');
const log = require('winston');
const ObjectsToCsv = require('objects-to-csv');
const path = require('path')

router.post('/', async (req, res) => {
    try {
        let { error } = validateOrder(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let order = await Order.findOne({ order_id: req.body.order_id });
        if (order) {
            return res.status(400).json({ message: 'Order Already Exists' });
        }

        order = new Order(req.body);
        await order.save();
        return res.status(200).json({ message: messages.ORDER_CREATE_SUCCESS });

    } catch (error) {
        log.error(error.message);
        return res.status(400).json({ message: messages.INTERNAL_SERVER_ERROR });
    }

});




function validateOrder(data) {
    const schema = Joi.object({
        order_id: Joi.number().required(),
        order_status: Joi.string(),
        order_date: Joi.date()
    })
    return schema.validate(data);
}
module.exports = router;