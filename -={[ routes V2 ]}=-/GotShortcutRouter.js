var express = require('express');
var bodyParser = require('body-parser');
var UsersRouter = express.Router();

var gotshortcut = require('../models/gotshortcut');

GotShortcutRouter.route('/')

.get(function(req,res,next)
{
    gotshortcut.getAll(res);
})

.post(function(req, res, next)
{
    //gotshortcut : convert json to other json
    gotshortcut.create(req.body, res);
});

GotShortcutRouter.route('/:id')

.get(function(req,res,next)
{
    //gotshortcut : get element by req.params.itemId
    gotshortcut.getAllTasks(req.params.id, res);
})

GotShortcutRouter.route('/:id/:id')

.put(function(req, res, next)
{
  //gotshortcut : get element by req.params.itemId
    gotshortcut.update(req.params.id, req.params.id2, req.body, res);
})

.delete(function(req, res, next)
{
    //gotshortcut : get element by req.params.itemId
    gotshortcut.delete(req.params.id, req.params.id2, res);
});
 
module.exports = GotShortcutRouter;
