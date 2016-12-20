var express = require('express');
var bodyParser = require('body-parser');
var TeamActualityRouter = express.Router();

var teamActuality = require('../models/TeamActuality');

TeamActualityRouter.route('/')

.get(function(req,res,next)
{
    teamActuality.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    teamActuality.create(req.body, res);
});


TeamActualityRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    teamActuality.getAllTeamActualities(req.params.id, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    teamActuality.delete(req.params.id, res);
});
 
module.exports = TeamActualityRouter;
