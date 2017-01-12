var express = require('express');
var bodyParser = require('body-parser');
var UserRouter = express.Router();

/*-- path for User model --*/
var user = require('../models/user');

/*-- PATH & METHODS AVAILABLE FROM ROUTE '/' --*/
UserRouter.route('/')
.get(function(req,res,next)
{
    //TODO : get all users in JSON array
    user.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    user.create(req.body, res);
})

.put(function(req, res, next)
{
    //TODO : convert json to other json
    user.update(req.body, res);
})

/*-- PATH & METHODS AVAILABLE FROM ROUTE '/:id' --*/
UserRouter.route('/:id')
.get(function(req,res,next)
{
    //TODO : get user details by req.params.userId
    user.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : update user by req.params.userId
    user.update(req.params.id, req.body, res);
})

/*-- PATH & METHODS AVAILABLE FROM ROUTE '/desactivate/:id' --*/
UserRouter.route('/desactivate/:id')
.post(function(req, res, next)
{
    //TODO : update 'active' parametre to false by req.params.userId
    user.desactivate(req.params.id, res);
})

/*-- PATH & METHODS AVAILABLE FROM ROUTE '/activate/:id' --*/
UserRouter.route('/activate/:id')
.post(function(req, res, next)
{
    //TODO : update 'active' parametre to tru by req.params.userId
    user.activate(req.params.id, res);
})
 
/*-- PATH & METHODS AVAILABLE FROM ROUTE '/login' --*/
UserRouter.route('/login')
.post(function(req, res, next) 
{
    console.log('check login');
    // TODO : check if login & password are in database
    user.checkLogin(req.body, res);
})

/*-- PATH & METHODS AVAILABLE FROM ROUTE '/postUser' --*/
UserRouter.route('/postUser')
.post(function(req, res, next) 
{
    console.log('postUser');
    // TODO : check if login & password are in database
    user.postUser(req.body, res);
}); 



module.exports = UserRouter;
