var express = require('express');
var bodyParser = require('body-parser');
var TaskRouter = express.Router();

var task = require('../models/task');

TaskRouter.route('/')

.get(function(req,res,next)
{
    task.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    task.create(req.body, res);
})

.put(function(req,res,next)
{
    task.update(req.body, res);
})

TaskRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    task.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    task.update(req.params.id, req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    task.delete(req.params.id, res);
});
 
module.exports = TaskRouter;
