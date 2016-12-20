var express = require('express');
var bodyParser = require('body-parser');
var UsersRouter = express.Router();

var message = require('../models/message');

TalkRouter.route('/')

.post(function(req, res, next)
{
    //message : convert json to other json
    message.create(req.body, res);
});

TalkRouter.route('/:id/:id')

.get(function(req,res,next)
{
    //message : get element by req.params.itemId
    message.getAllMessages(req.params.id, req.params.id2, res);
})

.delete(function(req, res, next)
{
    //message : get element by req.params.itemId
    message.delete(req.params.id, req.params.id2, res);
});
 
module.exports = TalkRouter;
