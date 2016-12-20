var connection = require('../connection');
 
function Actuality() 
{
    /**
     * Get ALL Actuality from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from Actuality', function(err, result) 
            {
                con.release();
                res.send(result);
            });
        });
    };

    /**
     * Create a Actuality
     * @params Actuality Actuality in json format
     * @params res response
     */
    this.create = function(Actuality, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into Actuality set ?', [Actuality], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Actuality creation failed'});
                } else 
                {
                    getLastId(res);
                }
            });
        });
    };

    /**
     * Get Team Actualities by teamId
     */
    this.get = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select title, dateActuality, publication, photo from Actuality '+
                'innerjoin TeamActuality on TeamActuality.idActuality = Actuality.idActuality '+
                'where TeamActuality.idTeam = ?', [id], function(err, result) {
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
     * Update a specific Actuality
     * @params Actuality Actuality in json format
     */
    this.update = function(Actuality, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('update Actuality set ? where idActuality = ?', [Actuality, Actuality.id], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Actuality update failed'});
                } 
                else 
                {
                    res.send({status: 0, message: 'Actuality updated successfully'});
                }
            });
        });
    };

    /**
     * Delete a specific Actuality
     * @params id Actuality's id
     * @params res response
     */
    this.delete = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete from Actuality where idActuality = ?', [id], function(err, result) 
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
            con.query('SELECT LAST_INSERT_ID() as idActuality',  function(err, result) {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Actuality creation failed'});
                }
                 else 
                 {
                    res.send({status: 0, message: 'Actuality created successfully', id:result[0].id});
                }
            });
        });
    }
}

module.exports = new Actuality();
