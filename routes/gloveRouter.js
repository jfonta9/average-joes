const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Gloves = require('../models/gloves');

const gloveRouter = express.Router();

gloveRouter.use(bodyParser.json());

gloveRouter.route('/')
.get((req,res,next) => {
    Gloves.find({})
    .then((gloves) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(gloves);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Gloves.create(req.body)
    .then((glove) => {
        console.log('Glove Created ', glove);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(glove);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /gloves');
})
.delete((req, res, next) => {
    Gloves.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

gloveRouter.route('/:gloveId')
.get((req,res,next) => {
    Gloves.findById(req.params.gloveId)
    .then((glove) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(glove);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /gloves/'+ req.params.gloveId);
})
.put((req, res, next) => {
    Gloves.findByIdAndUpdate(req.params.gloveId, {
        $set: req.body
    }, { new: true })
    .then((glove) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(glove);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Gloves.findByIdAndRemove(req.params.gloveId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = gloveRouter;