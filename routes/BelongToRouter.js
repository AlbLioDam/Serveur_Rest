var express = require('express');
var bodyParser = require('body-parser');
var BelongToRouter = express.Router();

var belongto = require('../models/belongto');

BelongToRouter.route('/')

.get(function(req,res,next)
{
    belongto.getAll(res);
})

.post(function(req, res, next)
{
    belongto.create(req.body, res);
})

.delete(function(req, res, next)
{
	console.log("route - delete user in team");
	console.log(req.body);
    belongto.removeUserFromTeam(req.body, res);
})

BelongToRouter.route('/usersinteam/:idTeam')

.get(function(req,res,next)
{
    console.log('/usersinteam/:idTeam');
    belongto.getAllInTeam(req.params.idTeam, res);
})

BelongToRouter.route('/usersnotinteam/:idTeam')

.get(function(req,res,next)
{
    console.log('/usersnotinteam/:idTeam');
    belongto.getAllNotInTeam(req.params.idTeam, res);
})

module.exports = BelongToRouter;
