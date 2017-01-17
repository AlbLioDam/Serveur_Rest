var express = require('express');
var bodyParser = require('body-parser');
var ToDoRouter = express.Router();

var todo = require('../models/todo');

ToDoRouter.route('/')

.get(function(req,res,next)
{
    todo.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    todo.create(req.body, res);
});

ToDoRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    todo.getAllTasksByTeamId(req.params.id, res);
})

ToDoRouter.route('/:idTask/:idTeam')

//faire un get par 2 ids

.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    todo.update(req.params.id, req.params.id2, req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    todo.delete(req.params.idTask, req.params.idTeam, res);
});
 
module.exports = ToDoRouter;
