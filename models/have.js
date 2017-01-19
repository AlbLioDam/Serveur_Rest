var connection = require('../connection');
 
function Have() 
{
    /**
     * Get a Have
     * @params Have Have in json format
     * @params res response
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('SELECT * FROM Have', function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Get Have failed'});
                } 
                else 
                {
                    //res.send({status: 0, message: 'Get Have OK'});
                }
            });
        });
    };
  
    /**
     * Create a Have
     * @params Have Have in json format
     * @params res response
     */
    this.create = function(Have, res) 
    {
        connection.acquire(function(err, con)
        {
            con.query('insert into Have(idUser,idTeam,idTask) VALUES (?,?,?)', [Have.idUser, Have.idTeam, Have.idTask], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Have creation failed'});
                } else 
                {
                    /*getLastId(res);*/
                }
            });
        });
    };

    this.delete = function(idTask, idTeam, res) 
    {
        connection.acquire(function(err, con)
        {
            con.query('delete from have where idTask = ? AND idTeam = ?', [idTask, idTeam], function(err, result) 
            {
                con.release();
                if (err) 
                {   
                    console.log(err);
                    res.send({status: 1, message: 'Failed to delete have'});
                } 
                else
                {
                    res.send({status: 0, message: 'Deleted successfully have'});
                }
            });
        });
    };

    this.update = function(task, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('update Have SET idUser= ?, idTeam = ? where idTask = ?', 
                [task.idUser, task.idTeam, task.idTask], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'have update failed'});
                } 
                else 
                {
                    res.send({status: 0, message: 'have updated successfully'});
                }
            });
        });
    };
}

module.exports = new Have();
