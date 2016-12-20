var express = require('express');
var bodyParser = require('body-parser');
var BelongToRouter = express.Router();

var belongto = require('../models/belongto');

BelongToRouter.route('/')

.get(function(req,res,next)
{
    belongto.getAll(res);
})

.post(function(req, res, next)
{
    //belongto : convert json to other json
    belongto.create(req.body, res);
});

BelongToRouter.route('/:id')

.get(function(req,res,next)
{
    //belongto : get element by req.params.itemId
    belongto.getAllTeams(req.params.id, res);
})

.get(function(req,res,next)
{
    //belongto : get element by req.params.itemId
    belongto.getAllUsers(req.params.id, res);
})

BelongToRouter.route('/:id/:id')

    //belongto : get specific element 
.get(function(req,res,next)
{
    belongto.getSpecific(req.params.id, req.params.id2, res);
})

.put(function(req, res, next)
{
  //belongto : get element by req.params.itemId
    belongto.update(req.params.id, req.params.id2, req.body, res);
})

.delete(function(req, res, next)
{
    //belongto : get element by req.params.itemId
    belongto.delete(req.params.id, req.params.id2, res);
});
 
module.exports = BelongToRouter;
