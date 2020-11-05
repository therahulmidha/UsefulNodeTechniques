const Order = require("../model/Order")
const log = require('winston');
const mailService = require('./mailService');
module.exports = {
    getOrderLengthInLastMinute: async function () {
        try {
            let orders = await Order.find({
                order_date: {
                    $gt: new Date().getTime() -1000 * 60
                }
            });
            if (orders.length > 10) {
                mailService.sendEmail();
                return true;
            }
            return false;
        } catch (error) {
            log.error(error.message);
        }
    },
}