var connection = require('../connection');
 
function LeisureActuality() 
{
    /**
     * Get ALL Actuality from table
     * @params res response 
     */
     
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select Actuality.idActuality, title, dateActuality, publication, photo, firstname, lastname, category, Actuality.idUser, Users.status from Actuality '+
                'INNER JOIN Users ON Users.idUser = Actuality.idUser '+
                'INNER JOIN LeisureActuality on LeisureActuality.idActuality = Actuality.idActuality order by Actuality.dateActuality desc', function(err, result) 
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
    this.create = function(LeisureActuality, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into Actuality(title, dateActuality, publication, photo, idUser) VALUES (?, now(), ?, ?, ?)', [LeisureActuality.title, LeisureActuality.publication, LeisureActuality.photo, LeisureActuality.idUser], function(err, result)
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Actuality creation failed'});
                } 
                else 
                {
                    getLastIdLeisureActualityInsert(LeisureActuality.category, res);
                }
            });
        });

        
    }

    /**
     * Delete a specific Actuality
     * @params id Actuality's id
     * @params res response
     */
    this.delete = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete from LeisureActuality where idActuality = ?', [id], function(err, result) 
            {
                con.release();
                if (err) 
                {   
                    console.log(err);
                    res.send({status: 1, message: 'Failed to delete from LeisureActuality'});
                } 
                else
                {
                    res.send({status: 0, message: 'Deleted successfully from LeisureActuality'});
                }
            });
        });
    };

    /**
     * get the last id 
     * TODO : move it in logical file
     * @params res response
     */
    function getLastIdLeisureActualityInsert(category, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('SELECT MAX(idActuality) as idActuality FROM Actuality',  function(err, result) {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Get Id failed'});
                }
                else 
                {
                    insertLeisureActuality(result[0].idActuality, category, res);
                }
            });
        });
    }

    function insertLeisureActuality(idActuality, category, res)
    {
        console.log("******** POST TEAM ACTUALITY *********");
        console.log("idactuality : " + idActuality); 
        connection.acquire(function(err, con) 
        {
            con.query('insert into LeisureActuality(idActuality, category) VALUES(?, ?)', [idActuality, category] , function(err, result){
                con.release();
                if (err) 
                {
                    console.log(err);
                    console.log("creation Leisure Actuality failed");
                    res.send({status: 1, message: 'LeisureActuality creation failed'});
                } 
                else
                {
                    console.log("creation Leisure Actuality ok");
                    res.send({status: 0, message: 'Insert in LeisureActuality ok'});
                }
            });
        });
    console.log("**************************************");
    }

}

module.exports = new LeisureActuality();
