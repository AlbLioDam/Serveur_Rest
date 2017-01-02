var connection = require('../connection');
 
function belongto() 
{
    /**
     * Get ALL users from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * FROM belongto'+
            ' INNER JOIN Users ON Users.idUser=belongto.idUser'+
            ' INNER JOIN Team ON Team.idTeam=belongto.idTeam', function(err, result)
            {
                con.release();
                res.send(result);
            });
        });
    };

    /**
     * Get ALL users from table
     * @params res response 
     */
    this.getTeamsOfUser = function(idUser, res)
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * FROM belongto'+
            ' INNER JOIN Team ON Team.idTeam = belongto.idTeam'+
            ' WHERE idUser = ?', [idUser], function(err, result)
            {
                con.release();
                console.log(result);
                res.send(result);
            });
        });
    };

    /**
     * Get ALL users in team from table
     * @params res response 
     */
    this.getAllInTeam = function(idTeam, res) 
    {
        console.log('getAllInTeam');
        connection.acquire(function(err, con)
        {
            con.query('SELECT * FROM belongto'+
            ' INNER JOIN Users ON Users.idUser=belongto.idUser'+
            ' INNER JOIN Team ON Team.idTeam=belongto.idTeam'+
            ' WHERE belongto.idTeam = ?', [idTeam], function(err, result)
            {
                con.release();
                res.send(result);
            });
        });
    };

    /**
     * Get ALL users in team from table
     * @params res response 
     */
    this.getAllNotInTeam = function(idTeam, res)
    {
        console.log('getAllNotInTeam');
        console.log(idTeam);
        connection.acquire(function(err, con)
        {
            con.query('SELECT * FROM Users WHERE Users.idUser NOT IN (SELECT belongto.idUser FROM belongto'+
            ' INNER JOIN Users ON Users.idUser=belongto.idUser'+
            ' INNER JOIN Team ON Team.idTeam=belongto.idTeam'+
            ' WHERE belongto.idTeam = ?)', [idTeam], function(err, result)
            {
                con.release();
                res.send(result);
            });
        });
    };

    /**
     * Create a belongto
     * @params belongto belongto in json format
     * @params res response
     */
    this.create = function(req, res) 
    {
        connection.acquire(function(err, con) 
        {

            con.query('insert into belongto (idUser, idTeam) values(?,?) ', [req.idUser, req.idTeam], function(err, result)
            {
                con.release();
                if (err)
                {
                    console.log(err);
                    res.send({status: 1, message: 'belongto creation failed'});
                } 
                else 
                {
                    console.log("belongto creation ok");
                    res.send({status: 0, message: 'belongto creation ok'});
                }
            });
        });
    };

    /**
     * Delete a specific belongto
     * @params id belongto's id
     * @params res response
     */
    this.removeUserFromTeam = function(req, res) 
    {
        console.log("models - delete user in team");
        console.log(req.idUser);
        console.log(req.idTeam);
        connection.acquire(function(err, con) 
        {
            con.query('delete FROM belongto where belongto.idUser = ? AND belongto.idTeam = ?', [req.idUser, req.idTeam], function(err, result) 
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

module.exports = new belongto();
