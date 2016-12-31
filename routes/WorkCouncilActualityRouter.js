var express = require('express');
var bodyParser = require('body-parser');
var WorkCouncilActualityRouter = express.Router();

var workcouncil = require('../models/workcouncilactuality');

WorkCouncilActualityRouter.route('/')

.get(function(req,res,next)
{
    workcouncil.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    workcouncil.create(req.body, res);
});

WorkCouncilActualityRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    workcouncil.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    workcouncil.update(req.params.id, req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    workcouncil.delete(req.params.id, res);
});
 
module.exports = WorkCouncilActualityRouter;
