var express = require('express');
var bodyParser = require('body-parser');
var UsersRouter = express.Router();

var todo = require('../models/todo');

TodoRouter.route('/')

.get(function(req,res,next)
{
    todo.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    todo.create(req.body, res);
});

TodoRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    todo.getAllTasks(req.params.id, res);
})

TodoRouter.route('/:id/:id')

.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    todo.update(req.params.id, req.params.id2, req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    todo.delete(req.params.id, req.params.id2, res);
});
 
module.exports = TodoRouter;
