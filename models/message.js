var connection = require('../connection');
 
function message() 
{
    /**
     * Get ALL Message from table
     * @params res response 
     */
    this.getAll = function(res)
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from Message ORDER BY dateMessage DESC', function(err, result) 
            {
                con.release();
                res.send(result);
            });
        });
    };

    /**
     * Create a message
     * @params message message in json format
     * @params res response
     */
    this.create = function(message, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into message(message, dateMessage, idUser, idUser_Users, read) VALUES (?, now(), ?, ?, ?)', [message.message, message.idUser, message.idUser_Users, message.read], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'message creation failed'});
                } 
                else 
                {
                    getLastId(res);
                }
            });
        });
    };

    /**
     * Get ALL Message from table
     * @params res response 
     */
    this.getAllMessages = function(iduser, iduser2, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select u.lastname, u.firstname, u2.lastname, u2.firstname, message, dateMessage from Message'+
            'INNER JOIN Users u ON u.idUser = Message.idUser'+
            'INNER JOIN Users u2 ON u2.idUser = Message.idUser_Users'+
            'WHERE Message.idUser = ? AND Message.idUser_Users = ?', [iduser, iduser2],  function(err, result) 
            {
                con.release();
                res.send(result);
            });
        });
    };

    /**
     * Delete a specific message
     * @params id message's id
     * @params res response
     */
    this.delete = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete from Message where idMessage = ?', [id], function(err, result) 
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
function getLastId(res) 
    {
        console.log('get last idMessage');
        connection.acquire(function(err, con) 
        {
            con.query('SELECT LAST_INSERT_ID() as idMessage',  function(err, result) {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Message creation failed'});
                }
                 else 
                 {
                    res.send({status: 0, message: 'Message created successfully', id:result[0].id});
                }
            });
        });
    }
}

module.exports = new message();
