var express = require('express');
var bodyParser = require('body-parser');
var UsersRouter = express.Router();

var postcomment = require('../models/postcomment');

PostCommentRouter.route('/')

.get(function(req,res,next)
{
    postcomment.getAll(res);
})

.post(function(req, res, next)
{
    //postcomment : convert json to other json
    postcomment.create(req.body, res);
});

PostCommentRouter.route('/:id')

.get(function(req,res,next)
{
    //postcomment : get element by req.params.itemId
    postcomment.getAllComments(req.params.id, res);
})

.get(function(req,res,next)
{
    //postcomment : get element by req.params.itemId
    postcomment.getAllCommentedUsers(req.params.id, res);
})

PostCommentRouter.route('/:id/:id')

.put(function(req, res, next)
{
  //postcomment : get element by req.params.itemId
    postcomment.update(req.params.id, req.params.id2, req.body, res);
})

.delete(function(req, res, next)
{
    //postcomment : get element by req.params.itemId
    postcomment.delete(req.params.id, req.params.id2, res);
});
 
module.exports = PostCommentRouter;
