var express = require('express');
var bodyParser = require('body-parser');
var HaveRouter = express.Router();

var have = require('../models/have');

HaveRouter.route('/')

.get(function(res, next)
{
    //have : convert json to other json
    have.getAll(res);
})

.post(function(req, res, next)
{
    //have : convert json to other json
    have.create(req.body, res);
})

.put(function(req, res, next)
{
	console.log("have - 3 arguments");
    //have : get element by req.params.itemId
    have.delete(req.params.idTask, req.params.idTeam, res);
})
 
module.exports = HaveRouter;
