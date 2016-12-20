var express = require('express');
var bodyParser = require('body-parser');
var MessageRouter = express.Router();

var message = require('../models/message');

MessageRouter.route('/')

.get(function(req,res,next)
{
    //message : get element by req.params.itemId
    message.getAll(res);
})

.post(function(req, res, next)
{
    //message : convert json to other json
    message.create(req.body, res);
});

MessageRouter.route('/:id')

.get(function(req,res,next)
{
    //message : get element by req.params.itemId
    message.getAllMessages(req.params.id, req.params.id2, res);
})

.delete(function(req, res, next)
{
    //message : get element by req.params.itemId
    message.delete(req.params.id, res);
});
 
module.exports = MessageRouter;
