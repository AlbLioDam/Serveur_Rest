var connection = require('../connection');
 
function corporate() 
{
    /**
     * Get ALL Corporate Actuality from table
     * @params res response 
     */
     this.getAll = function(res) 
    {
            
        connection.acquire(function(err, con) 
        {con.query('SELECT title, dateActuality, publication, photo, firstname, lastname from Actuality '+
                'INNER JOIN corporatelifeactuality on corporatelifeactuality.idActuality = Actuality.idActuality '+
                'INNER JOIN Users ON Users.idUser = Actuality.idUser '+
                'where corporatelifeactuality.idActuality = Actuality.idActuality order by Actuality.dateActuality desc' , function(err, result) 
            {
                con.release();
                res.send(result);
                console.log("**********************************");
                console.log("** Get all Corporate Actualites **");
                console.log("**********************************");
                console.log(result);
                console.log("**********************************");
            });
        });
    }; 

    /**
     * Create an Corporate Actuality
     * @params Actuality Actuality in json format
     * @params res response
     */
    this.create = function(corporatelifeactuality, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into Actuality(title, dateActuality, publication, photo, idUser) VALUES (?, now(), ?, ?, ?)', [corporatelifeactuality.title, corporatelifeactuality.publication, corporatelifeactuality.photo, corporatelifeactuality.idUser], function(err, result)
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Actuality creation failed'});
                } 
                else 
                {
                    
                    getLastIdCorpActualityInsert(res);
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
     * 
     * get the last id 
     * TODO : move it in logical file
     * @params res response
     */
   
    function getLastIdCorpActualityInsert(res) 
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
                    insertcorporatelifeactuality(result[0].idActuality, res);
                }
            });
        });
    }

    /**
     * 
     * Insert id value in Corporate Life Actuality table 
     * TODO : move it in logical file
     * @params res response
     */
    function insertcorporatelifeactuality(idActuality, res)
    {
        console.log("******** POST Corporate ACTUALITY *********");
        console.log("idactuality : " + idActuality);        
        connection.acquire(function(err, con) 
        {
            con.query('insert into corporatelifeactuality(idActuality) VALUES(?)', [idActuality] , function(err, result){
                con.release();
                if (err) 
                {
                    console.log(err);
                    console.log("creation corporatelifeactuality Actuality failed");
                    res.send({status: 1, message: 'corporatelifeactuality creation failed'});
                } 
                else 
                {
                    console.log("creation corporatelifeactuality Actuality ok");
                    res.send({status: 0, message: 'Insert in corporatelifeactuality ok'});
                }
            });
        });
    console.log("**************************************");
    }

}

module.exports = new corporate();
