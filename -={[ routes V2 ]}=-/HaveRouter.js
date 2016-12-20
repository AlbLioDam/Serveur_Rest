var express = require('express');
var bodyParser = require('body-parser');
var UsersRouter = express.Router();

var have = require('../models/have');

HaveRouter.route('/')

.get(function(req,res,next)
{
    have.getAll(res);
})

.post(function(req, res, next)
{
    //have : convert json to other json
    have.create(req.body, res);
});

HaveRouter.route('/:id')

.get(function(req,res,next)
{
    //have : get element by req.params.itemId
    have.getAllTasks(req.params.id, res);
})

HaveRouter.route('/:id/:id/:id')

.put(function(req, res, next)
{
  //have : get element by req.params.itemId
    have.update(req.params.id, req.params.id2, req.body, res);
})

.delete(function(req, res, next)
{
    //have : get element by req.params.itemId
    have.delete(req.params.id, req.params.id2, req.params.id3, res);
});
 
module.exports = HaveRouter;
