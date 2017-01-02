var express = require('express');
var bodyParser = require('body-parser');
var BelongToRouter = express.Router();

var belongto = require('../models/belongto');

BelongToRouter.route('/')
.get(function(req,res,next)
{
    console.log("getAllTeams");
    belongto.getAll(res);
})

.post(function(req, res, next)
{
    belongto.create(req.body, res);
})

BelongToRouter.route('/getAllTeamsById/:idUser')
.get(function(req,res,next)
{
    console.log("getTeamsOfUser");
    console.log(req.params.idUser);
    belongto.getTeamsOfUser(req.params.idUser, res);
})

BelongToRouter.route('/remove')
.post(function(req, res, next)
{
	console.log("route - delete user in team");
	console.log(req.body);
	console.log(req.params.idUser);
	console.log(req.params.idTeam);
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
