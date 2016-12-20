var connection = require('../connection');
 
function department() 
{
    /**
     * Get ALL Department from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from Department', function(err, result) 
            {
                con.release();
                res.send(result);
            });
        });
    };

    /**
     * Create a department
     * @params department department in json format
     * @params res response
     */
    this.create = function(department, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into department set ?', department, function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'department creation failed'});
                } else 
                {
                    getLastId(res);
                }
            });
        });
    };

    /**
     * Get a specific department
     */
    this.get = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from Department where idDepartment = ?', [id], function(err, result) {
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
     * Update a specific department
     * @params department department in json format
     */
    this.update = function(department, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('update Department set ? where idDepartment = ?', [department, department.id], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'department update failed'});
                } 
                else 
                {
                    res.send({status: 0, message: 'department updated successfully'});
                }
            });
        });
    };

    /**
     * Delete a specific department
     * @params id department's id
     * @params res response
     */
    this.delete = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete from Department where idDepartment = ?', [id], function(err, result) 
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
        console.log('get last idDepartment');
        connection.acquire(function(err, con) 
        {
            con.query('SELECT LAST_INSERT_ID() as id',  function(err, result) {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'department creation failed'});
                }
                 else 
                 {
                    res.send({status: 0, message: 'department created successfully', id:result[0].id});
                }
            });
        });
    }
}

module.exports = new department();
