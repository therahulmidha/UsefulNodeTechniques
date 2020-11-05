const nodemailer = require('nodemailer');
const log = require('winston');
const config = require('config')
const sendGridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: config.get('sendGridKey')
    }
}));

function sendEmail() {
    transporter.sendMail({
        to: config.get('notifyEmailIdTo'),
        from: config.get('notifyEmailIdFrom'),
        subject: `More than 10 orders placed in last minute`,
        html: `More than 10 orders placed in last minute, timestamp: ${new Date()} `
    }).then(data => {
        log.info(data);
    }).catch(err => {
        log.error(err);
    });
}

module.exports.sendEmail = sendEmail;