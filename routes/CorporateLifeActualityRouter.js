var express = require('express');
var bodyParser = require('body-parser');
var corporatelifeactuality = express.Router();

var corporatelifeactuality = require('../models/corporatelifeactuality');

LeisureRouter.route('/')

.get(function(req,res,next)
{
    corporatelifeactuality.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    corporatelifeactuality.create(req.body, res);
});

LeisureRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    corporatelifeactuality.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    corporatelifeactuality.update(req.params.id, req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    corporatelifeactuality.delete(req.params.id, res);
});
 
module.exports = LeisureRouter;
