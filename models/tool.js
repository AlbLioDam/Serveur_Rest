var connection = require('../connection');
 
function Tool() 
{
    /**
     * Get ALL Tool from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from Tool', function(err, result) 
            {
                con.release();
                res.send(result);
            });
        });
    };

    /**
     * Create a Tool
     * @params Tool Tool in json format
     * @params res response
     */
    this.create = function(Tool, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into Tool set ?', Tool, function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Tool creation failed'});
                } else 
                {
                    getLastId(res);
                }
            });
        });
    };

    /**
     * Get a specific Tool
     */
    this.get = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from Tool where id = ?', [id], function(err, result) {
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
     * Update a specific Tool
     * @params Tool Tool in json format
     */
    this.update = function(Tool, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('update Tool set ? where id = ?', [Tool, Tool.id], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Tool update failed'});
                } 
                else 
                {
                    res.send({status: 0, message: 'Tool updated successfully'});
                }
            });
        });
    };

    /**
     * Delete a specific Tool
     * @params id Tool's id
     * @params res response
     */
    this.delete = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete from Tool where id = ?', [id], function(err, result) 
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
                    res.send({status: 1, message: 'Tool creation failed'});
                }
                 else 
                 {
                    res.send({status: 0, message: 'Tool created successfully', id:result[0].id});
                }
            });
        });
    }
}

module.exports = new Tool();
