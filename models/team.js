var connection = require('../connection');
 
function Team() 
{
    /**
     * Get ALL Team from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from Team', function(err, result) 
            {
                con.release();
                res.send(result);
            });
        });
    };

    /**
     * Create a Team
     * @params Team Team in json format
     * @params res response
     */
    this.create = function(Team, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into Team set ?', Team, function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Team creation failed'});
                } else 
                {
                    getLastId(res);
                }
            });
        });
    };

    /**
     * Get a specific Team
     */
    this.get = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from Team where id = ?', [id], function(err, result) {
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
     * Update a specific Team
     * @params Team Team in json format
     */
    this.updateTeam = function(Team, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('update Team set ? where idTeam = ?', [Team, Team.idTeam], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Team update failed'});
                } 
                else 
                {
                    res.send({status: 0, message: 'Team updated successfully'});
                }
            });
        });
    };

    /**
     * Delete a specific Team
     * @params id Team's id
     * @params res response
     */
    this.delete = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete from Team where id = ?', [id], function(err, result) 
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

    /**
     * get the last id 
     * TODO : move it in logical file
     * @params res response
     */
    function getLastId(res) 
    {
        console.log('get last id');
        connection.acquire(function(err, con) 
        {
            con.query('SELECT LAST_INSERT_ID() as id',  function(err, result) {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Team creation failed'});
                }
                 else 
                 {
                    res.send({status: 0, message: 'Team created successfully', id:result[0].id});
                }
            });
        });
    }
}

module.exports = new Team();
