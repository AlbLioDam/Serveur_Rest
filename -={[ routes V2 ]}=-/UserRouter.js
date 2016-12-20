var express = require('express');
var bodyParser = require('body-parser');
var UsersRouter = express.Router();

var user = require('../models/user');

UserRouter.route('/')

.get(function(req,res,next)
{
    user.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    user.create(req.body, res);
});

UserRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    user.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    user.update(req.params.id, req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    user.delete(req.params.id, res);
});
 
module.exports = UserRouter;
