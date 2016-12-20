var express = require('express');
var bodyParser = require('body-parser');
var ToolRouter = express.Router();

/*-- path for tool model --*/
var tool = require('../models/tool');

/*-- PATH & METHODS AVAILABLE FROM ROUTE '/' --*/
ToolRouter.route('/')

.get(function(req,res,next)
{
    // TODO : get all tools available
    tool.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    tool.create(req.body, res);
});

/*-- PATH & METHODS AVAILABLE FROM ROUTE '/' --*/
ToolRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    tool.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    tool.update(req.params.id, req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    tool.delete(req.params.id, res);
});
 
module.exports = ToolRouter;
