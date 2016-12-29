var express = require('express');
var bodyParser = require('body-parser');
var CorporateLifeActualityRouter = express.Router();

var corporate = require('../models/corporatelifeactuality');

CorporateLifeActualityRouter.route('/')

.get(function(req,res,next)
{
    corporate.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    corporate.create(req.body, res);
});

CorporateLifeActualityRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    corporate.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    corporate.update(req.params.id, req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    corporate.delete(req.params.id, res);
});
 
module.exports = CorporateLifeActualityRouter;
