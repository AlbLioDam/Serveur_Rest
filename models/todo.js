var connection = require('../connection');

function Todo() {
    /**
     * Get ALL Todo from table
     * @params res response 
     */

    /*
    this.getAll = function (res) {
        connection.acquire(function (err, con) {
            con.query('select * from toDo'
                + ' inner join Team on Team.idTeam = toDo.idTeam'
                + ' inner join Task on Task.idTask = toDo.idTask', function (err, result) {
                    con.release();
                    res.send(result);
                });
        });
    };*/

    /**
     * Create a Todo
     * @params Todo Todo in json format
     * @params res response
     */
    this.create = function (Todo, res) {
        connection.acquire(function (err, con) {
            con.query('insert into toDo(status,weight,duration,idTeam,idTask) VALUES (?,?,?,?,?)', [Todo.Status, Todo.Weight, Todo.Duration, Todo.idTeam, Todo.idTask], function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({ status: 1, message: 'Todo creation failed' });
                } else {
                    res.send({ status: 0, message: 'Todo creation ok' });
                    //getLastId(res);
                }
            });
        });
    };

    /**
     * Get a specific Todo
     */
    this.get = function (id, res) {
        connection.acquire(function (err, con) {
            con.query('select * from toDo where id = ?', [id], function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({ status: 1, message: 'Failed to find' });
                }
                else {
                    res.send(result);
                }
            });
        });
    };

    /**
     * Get a specific Todo by idTeam
     */
    this.getAllTasksByTeamId = function (id, res) {
        connection.acquire(function (err, con) {
            con.query('select teamName, taskName, duration, status, weight from toDo where idTeam = ?'
                + 'inner join Team on Team.idTeam = Todo.idTeam'
                + 'inner join Task on Task.idTask = Todo.idTask', [id], function (err, result) {
                    con.release();
                    if (err) {
                        console.log(err);
                        res.send({ status: 1, message: 'Failed to find' });
                    }
                    else {
                        res.send(result);
                    }
                });
        });
    };

    /**
     * Update a specific Todo
     * @params Todo Todo in json format
     */
    this.update = function (task, res) {
        connection.acquire(function (err, con) {
            con.query('update Todo set duration = ?, status = ?, weight = ?,'+
            ' dateDeDebut = CASE ? '+
                                'WHEN "now" THEN now() '+
                                'WHEN "null" THEN null '+
                                'ELSE dateDeDebut '+
                            'END,'+
            ' dateDeFin = CASE ? '+
                                'WHEN "now" THEN now() '+
                                'WHEN "null" THEN null '+
                                'ELSE dateDeFin '+
                            'END'+
            ' where idTask = ? AND idTeam = ?',
                [task.duration,task.status,task.weight,task.dateDeDebut,task.dateDeFin,task.idTask,task.idTeam], function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({ status: 1, message: 'TodoTask update failed' });
                }
                else {
                    res.send({ status: 0, message: 'TodoTask updated successfully' });
                }
            });
        });
    };

    /**
     * Delete a specific Todo
     * @params id Todo's id
     * @params res response
     */
    this.delete = function(idTask, idTeam, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete from toDo where idTask = ? AND idTeam = ?', [idTask, idTeam], function(err, result) 
            {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({ status: 1, message: 'Failed to delete' });
                }
                else {
                    res.send({ status: 0, message: 'Deleted successfully' });
                }
            });
        });
    };

    this.getAll = function (res) {
        connection.acquire(function (err, con) {
            con.query('select todo.idTask, task.taskName, task.detail, todo.idTeam, Team.teamName, have.idUser, Users.firstname, Users.lastname, todo.duration, todo.status, todo.weight FROM todo'
                + ' LEFT JOIN have ON todo.idTeam = have.idTeam AND todo.idTask = have.idTask'
                + ' LEFT JOIN Users ON Users.idUser = have.idUser'
                + ' LEFT JOIN Task ON Task.idTask = todo.idTask '
                + ' LEFT JOIN Team ON Team.idTeam = todo.idTeam', function (err, result) {
                    con.release();
                    res.send(result);
                });
        });
    }
}

module.exports = new Todo();
