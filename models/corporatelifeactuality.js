var connection = require('../connection');
 
function TeamActuality() 
{
    /**
     * Get ALL Actuality from table
     * @params res response 
     */
     
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select Actuality.idActuality, title, dateActuality, publication, photo, idTeam from Actuality '+
                'inner join TeamActuality on TeamActuality.idActuality = Actuality.idActuality order by Actuality.dateActuality desc', function(err, result) 
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
    this.create = function(TeamActuality, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into Actuality(title, dateActuality, publication, photo, idUser) VALUES (?, now(), ?, ?, ?)', [TeamActuality.title, TeamActuality.publication, TeamActuality.photo, TeamActuality.idUser], function(err, result)
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Actuality creation failed'});
                } 
                else 
                {
                    getLastIdTeamActualityInsert(TeamActuality.idTeam, res);
                }
            });
        });
    }

    /**
     * Get Team Actualities by teamId
     */
    this.getAllTeamActualities = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select title, dateActuality, publication, photo from Actuality '+
                'inner join TeamActuality on TeamActuality.idActuality = Actuality.idActuality '+
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
     /*
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
    */
    /**
     * Delete a specific Actuality
     * @params id Actuality's id
     * @params res response
     */
    this.delete = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete from TeamActuality where idActuality = ?', [id], function(err, result) 
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
   
    function getLastIdTeamActualityInsert(idTeam, res) 
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
                    insertTeamActuality(result[0].idActuality, idTeam, res);
                }
            });
        });
    }

    function insertTeamActuality(idActuality, idTeam, res)
    {
        console.log("******** POST TEAM ACTUALITY *********");
        console.log("idactuality : " + idActuality);
        console.log("idteam : " + idTeam);        
        connection.acquire(function(err, con) 
        {
            con.query('insert into TeamActuality(idActuality, idTeam) VALUES(?, ?)', [idActuality, idTeam] , function(err, result){
                con.release();
                if (err) 
                {
                    console.log(err);
                    console.log("creation Team Actuality failed");
                    res.send({status: 1, message: 'TeamActuality creation failed'});
                } 
                else 
                {
                    console.log("creation Team Actuality ok");
                    res.send({status: 0, message: 'Insert in TeamActuality ok'});
                }
            });
        });
    console.log("**************************************");
    }

}

module.exports = new TeamActuality();
