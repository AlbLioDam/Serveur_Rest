var express = require('express');
var bodyParser = require('body-parser');
var UsersRouter = express.Router();

var leisureActuality = require('../models/leisureActuality');

LeisureRouter.route('/')

.get(function(req,res,next)
{
    leisureActuality.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    leisureActuality.create(req.body, res);
});

LeisureRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    leisureActuality.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    leisureActuality.update(req.params.id, req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    leisureActuality.delete(req.params.id, res);
});
 
module.exports = LeisureRouter;
