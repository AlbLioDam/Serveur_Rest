var express = require('express');
var bodyParser = require('body-parser');
var LeisureActualityRouter = express.Router();

var leisureactuality = require('../models/leisureActuality');

LeisureActualityRouter.route('/')

.get(function(req,res,next)
{
    leisureactuality.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    leisureactuality.create(req.body, res);
});


LeisureActualityRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    leisureactuality.getAllTeamActualities(req.params.id, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    leisureactuality.delete(req.params.id, res);
});
 
module.exports = LeisureActualityRouter;
