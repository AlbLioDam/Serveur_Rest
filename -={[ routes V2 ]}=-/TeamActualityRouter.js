var express = require('express');
var bodyParser = require('body-parser');
var UsersRouter = express.Router();

var actuality = require('../models/actuality');

TeamActualityRouter.route('/')

.get(function(req,res,next)
{
    actuality.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    actuality.create(req.body, res);
});

TeamActualityRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    actuality.getAllTeamActualities(req.params.id, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    actuality.delete(req.params.id, res);
});
 
module.exports = TeamActualityRouter;
