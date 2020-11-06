const express = require('express');
const error = require('../middleware/error');
const cors = require('cors');
const path = require('path')

const homeRouter = require('../routes/views/home');
const orderRouter = require('../routes/api/order')
const userRouter = require('../routes/api/user')
module.exports = async function (app) {
    // allow cross origin resource sharing
    // so that front end app on another server can access our backend 
    app.use(cors());

    app.use(express.json());
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.set('view engine', 'pug'); // set global values
    app.set('views', 'views'); // look for views in views folder

    // Route endpoints
    app.use(homeRouter);
    app.use('/api/order', orderRouter)
    app.use('/api/user', userRouter)

    // middleware for handling internal server error
    app.use(error);

    // Middleware for unknown endpoints
    app.use(function (req, res, next) {
        return res.status(404).send({
            message: 'Route ' + req.url + ' Not found.',
            data: null
        });
    });
}