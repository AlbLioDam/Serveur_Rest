var express = require('express');
var bodyParser = require('body-parser');
var DepartmentRouter = express.Router();

var department = require('../models/department');

DepartmentRouter.route('/')

.get(function(req,res,next)
{
    department.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    department.create(req.body, res);
});

DepartmentRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    department.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    department.update(req.params.id, req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    department.delete(req.params.id, res);
});
 
module.exports = DepartmentRouter;
