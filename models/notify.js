var connection = require('../connection');
 
function notify() 
{
    /**
     * Get ALL users from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select lastname,title FROM notify'+
            ' INNER JOIN Users ON Users.idUser=notify.idUser'+
            ' INNER JOIN Actuality ON Actuality.idActuality=notify.idActuality', function(err, result) 
            {
                con.release();
                res.send(result);
            });
        });
    };

    /**
     * Create a notify
     * @params notify notify in json format
     * @params res response
     */
    this.create = function(notify, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into notify set ?', notify, function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'notify creation failed'});
                } else 
                {
                    getLastId(res);
                }
            });
        });
    };

    /**
     * Get a specific notify
     */
    this.get = function(userid, idteam, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select firstname,lastname,teamName FROM notify'+
            ' INNER JOIN Users ON Users.idUser=notify.idUser'+
            ' INNER JOIN Team ON Team.idTeam=notify.idTeam'+
            ' WHERE notify.idUser = ? AND notify.idTeam = ?', [idUser, idTeam], function(err, result) {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Failed to find'});
                } 
                else 
                {
                    res.send(result);
                }
            });
        });
    };

    /**
     * Delete a specific notify
     * @params id notify's id
     * @params res response
     */
    this.delete = function(iduser, idteam, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete FROM notify where notify.idUser = ? AND notify.idTeam = ?', [idUser, idTeam], function(err, result) 
            {
                con.release();
                if (err) 
                {   
                    console.log(err);
                    res.send({status: 1, message: 'Failed to delete'});
                } 
                else 
                {
                    res.send({status: 0, message: 'Deleted successfully'});
                }
            });
        });
    };

    
}

module.exports = new notify();
