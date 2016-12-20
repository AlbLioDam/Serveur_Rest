var express = require('express');
var bodyParser = require('body-parser');
var RdvRouter = express.Router();

var rdv = require('../models/rdv');

RdvRouter.route('/')

.get(function(req,res,next)
{
    rdv.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    rdv.create(req.body, res);
});

RdvRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    rdv.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    rdv.update(req.params.id, req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    rdv.delete(req.params.id, res);
});
 
module.exports = RdvRouter;
