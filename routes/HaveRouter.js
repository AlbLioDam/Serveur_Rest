var express = require('express');
var bodyParser = require('body-parser');
var HaveRouter = express.Router();

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
    have.getAllTasksByTeamId(req.params.id, res);
})

HaveRouter.route('/:id/:id')

//faire un get par 2 ids

.put(function(req, res, next)
{
  //have : get element by req.params.itemId
    have.update(req.params.id, req.params.id2, req.body, res);
})

.delete(function(req, res, next)
{
    //have : get element by req.params.itemId
    have.delete(req.params.id, req.params.id2, res);
});
 
module.exports = HaveRouter;
