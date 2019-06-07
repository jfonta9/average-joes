const express = require('express');
const bodyParser = require('body-parser');

const gloveRouter = express.Router();

gloveRouter.use(bodyParser.json());

gloveRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the gloves to you!');
})
.post((req, res, next) => {
    res.end('Will add the glove: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /gloves');
})
.delete((req, res, next) => {
    res.end('Deleting all gloves');
});

module.exports = gloveRouter;