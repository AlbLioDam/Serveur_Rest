var express = require('express');
var bodyParser = require('body-parser');
var UsersRouter = express.Router();

var workslifeactuality = require('../models/workslifeactuality');

LeisureRouter.route('/')

.get(function(req,res,next)
{
    workslifeactuality.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    workslifeactuality.create(req.body, res);
});

LeisureRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    workslifeactuality.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    workslifeactuality.update(req.params.id, req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    workslifeactuality.delete(req.params.id, res);
});
 
module.exports = LeisureRouter;
