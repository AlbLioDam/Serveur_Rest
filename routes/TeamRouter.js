var express = require('express');
var bodyParser = require('body-parser');
var TeamRouter = express.Router();

var team = require('../models/team');

TeamRouter.route('/')

.get(function(req,res,next)
{
    team.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    team.create(req.body, res);
})

.put(function(req, res, next)
{
    team.updateTeam(req.body, res);
})

TeamRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    team.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    team.update(req.params.id, req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    team.delete(req.params.id, res);
});
 
module.exports = TeamRouter;
