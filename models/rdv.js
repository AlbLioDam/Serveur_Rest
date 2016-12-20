var connection = require('../connection');
 
function Rdv() 
{
    /**
     * Get ALL Rdv from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from Rdv', function(err, result) 
            {
                con.release();
                res.send(result);
            });
        });
    };

    /**
     * Create a Rdv
     * @params Rdv Rdv in json format
     * @params res response
     */
    this.create = function(Rdv, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into Rdv set ?', Rdv, function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Rdv creation failed'});
                } else 
                {
                    getLastId(res);
                }
            });
        });
    };

    /**
     * Get a specific Rdv
     */
    this.get = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from Rdv where id = ?', [id], function(err, result) {
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
     * Update a specific Rdv
     * @params Rdv Rdv in json format
     */
    this.update = function(Rdv, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('update Rdv set ? where id = ?', [Rdv, Rdv.id], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Rdv update failed'});
                } 
                else 
                {
                    res.send({status: 0, message: 'Rdv updated successfully'});
                }
            });
        });
    };

    /**
     * Delete a specific Rdv
     * @params id Rdv's id
     * @params res response
     */
    this.delete = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete from Rdv where id = ?', [id], function(err, result) 
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
                    res.send({status: 1, message: 'Rdv creation failed'});
                }
                 else 
                 {
                    res.send({status: 0, message: 'Rdv created successfully', id:result[0].id});
                }
            });
        });
    }
}

module.exports = new Rdv();
