'use strict';

var connection = require('../connection');
 
function Task() 
{
    /**
     * Get ALL Task from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from Task', function(err, result) 
            {
                con.release();
                res.send(result);
            });
        });
    };

    /**
     * Create a Task
     * @params Task Task in json format
     * @params res response
     */

    this.create = function(Task, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into Task(taskName,detail) VALUES (?,?)', [Task.taskName, Task.detail], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Task creation failed'});
                } else 
                {
                    getLastId(res);
                    console.log('OK')
                }
            });
        });
    };

    


    /**
     * Get a specific Task
     */
    this.get = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from Task where id = ?', [id], function(err, result) {
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
     * Update a specific Task
     * @params Task Task in json format
     */
    this.update = function(Task, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('update Task set ? where id = ?', [Task, Task.id], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Task update failed'});
                } 
                else 
                {
                    res.send({status: 0, message: 'Task updated successfully'});
                }
            });
        });
    };

    /**
     * Delete a specific Task
     * @params id Task's id
     * @params res response
     */
    this.delete = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete from Task where id = ?', [id], function(err, result) 
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
            con.query('SELECT MAX(idTask) FROM task',  function(err, result) {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Task creation failed'});
                }
                 else 
                 {
                    res.send({status: 0, message: 'Task created successfully', idTask:result[0].idTask});
                    console.log("je suis le résultat "+result[0]);
                }
            });
        });
    }
}

module.exports = new Task();
