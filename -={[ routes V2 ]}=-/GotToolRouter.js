var express = require('express');
var bodyParser = require('body-parser');
var UsersRouter = express.Router();

var gottool = require('../models/gottool');

GotToolRouter.route('/')

.get(function(req,res,next)
{
    gottool.getAll(res);
})

.post(function(req, res, next)
{
    //gottool : convert json to other json
    gottool.create(req.body, res);
});

GotToolRouter.route('/:id')

.get(function(req,res,next)
{
    //gottool : get element by req.params.itemId
    gottool.getAllTasks(req.params.id, res);
})

GotToolRouter.route('/:id/:id/:id')

.put(function(req, res, next)
{
  //gottool : get element by req.params.itemId
    gottool.update(req.params.id, req.params.id2, req.params.id3, req.body, res);
})

.delete(function(req, res, next)
{
    //gottool : get element by req.params.itemId
    gottool.delete(req.params.id, req.params.id2, req.params.id3, res);
});
 
module.exports = GotToolRouter;
