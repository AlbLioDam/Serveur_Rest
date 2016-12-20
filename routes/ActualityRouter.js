var express = require('express');
var bodyParser = require('body-parser');
var ActualityRouter = express.Router();

var actuality = require('../models/actuality');

ActualityRouter.route('/')

.get(function(req,res,next)
{
    actuality.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    actuality.create(req.body, res);
});

ActualityRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    actuality.get(req.params.id, res);
})

/* -- Actuality update will be implemented in future version --
.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    actuality.update(req.params.id, req.body, res);
})
*/

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    actuality.delete(req.params.id, res);
});
 
module.exports = ActualityRouter;
