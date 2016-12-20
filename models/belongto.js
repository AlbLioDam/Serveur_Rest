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
            con.query('select firstname,lastname,teamName FROM belongto'+
            ' INNER JOIN Users ON Users.idUser=belongto.idUser'+
            ' INNER JOIN Team ON Team.idTeam=belongto.idTeam', function(err, result) 
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
    this.create = function(belongto, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into belongto set ?', belongto, function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'belongto creation failed'});
                } else 
                {
                    getLastId(res);
                }
            });
        });
    };

    /**
     * Get a specific belongto
     */
    this.get = function(userid, idteam, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select firstname,lastname,teamName FROM belongto'+
            ' INNER JOIN Users ON Users.idUser=belongto.idUser'+
            ' INNER JOIN Team ON Team.idTeam=belongto.idTeam'+
            ' WHERE belongto.idUser = ? AND belongto.idTeam = ?', [idUser, idTeam], function(err, result) {
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
     * Delete a specific belongto
     * @params id belongto's id
     * @params res response
     */
    this.delete = function(iduser, idteam, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete FROM belongto where belongto.idUser = ? AND belongto.idTeam = ?', [idUser, idTeam], function(err, result) 
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
