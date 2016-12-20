var express = require('express');
var bodyParser = require('body-parser');
var UsersRouter = express.Router();

var notify = require('../models/notify');

NotifyRouter.route('/')

.get(function(req,res,next)
{
    notify.getAll(res);
})

.post(function(req, res, next)
{
    //notify : convert json to other json
    notify.create(req.body, res);
});

NotifyRouter.route('/:id')

.get(function(req,res,next)
{
    //notify : get element by req.params.itemId
    notify.getAllNotifiedUsers(req.params.id, res);
})

.get(function(req,res,next)
{
    //notify : get element by req.params.itemId
    notify.getAllTeamActualities(req.params.id, res);
})

NotifyRouter.route('/:id/:id')

.delete(function(req, res, next)
{
    //notify : get element by req.params.itemId
    notify.delete(req.params.id, req.params.id2, res);
});
 
module.exports = NotifyRouter;
