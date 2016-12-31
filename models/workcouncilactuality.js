var connection = require('../connection');
 
function workcouncil() 
{
    /**
     * Get ALL work council Actuality from table
     * @params res response 
     */
     this.getAll = function(res)
    {
            
        connection.acquire(function(err, con) 
        {
            con.query( 'select title, dateActuality, publication, photo from Actuality '+
                'inner join workscouncilactuality on workscouncilactuality.idActuality = Actuality.idActuality '+
                'where workscouncilactuality.idActuality = Actuality.idActuality order by Actuality.dateActuality desc' , function(err, result) 
            {
                con.release();
                res.send(result);
                console.log("*************************************");
                console.log("** Get all work council Actualites **");
                console.log("*************************************");
                console.log(result);
                console.log("*************************************");
            });
        });
    }; 

    /**
     * Create an work council Actuality
     * @params Actuality Actuality in json format
     * @params res response
     */
    this.create = function(workscouncilactuality, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into Actuality(title, dateActuality, publication, photo, idUser) VALUES (?, now(), ?, ?, ?)', [workscouncilactuality.title, workscouncilactuality.publication, workscouncilactuality.photo, workscouncilactuality.idUser], function(err, result)
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Actuality creation failed'});
                } 
                else 
                {
                    console.log("insert into actuality ok !");
                    getLastIdWorksCouncilActualityInsert(res);
                }
            });
        });
    }

    /**
     * Get Team Actualities by teamId
     */
    this.getAllWorksCouncilActuality = function(id, res)
    {
        connection.acquire(function(err, con) 
        {
            con.query('select title, dateActuality, publication, photo from Actuality '+
                'inner join WorksCouncilActuality on WorksCouncilActuality.idActuality = Actuality.idActuality '+
                'where WorksCouncilActuality.idTeam = ?', [id], function(err, result) {
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
/*    this.delete = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete from WorksCouncilActuality where idActuality = ?', [id], function(err, result) 
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
    };*/

    /**
     * 
     * get the last id 
     * TODO : move it in logical file
     * @params res response
     */
   
    function getLastIdWorksCouncilActualityInsert(res)
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
                    console.log("get max into actuality ok !");
                    insertworkscouncilactuality(result[0].idActuality, res);
                }
            });
        });
    }

    /**
     * 
     * Insert id value in work council Life Actuality table 
     * TODO : move it in logical file
     * @params res response
     */
    function insertworkscouncilactuality(idActuality, res)
    {
        console.log("******** POST work council ACTUALITY *********");
        console.log("idactuality : " + idActuality);        
        connection.acquire(function(err, con) 
        {
            con.query('insert into workscouncilactuality(idActuality) VALUES(?)', [idActuality] , function(err, result){
                con.release();
                if (err) 
                {
                    console.log(err);
                    console.log("creation workscouncilactuality Actuality failed");
                    res.send({status: 1, message: 'workscouncilactuality creation failed'});
                } 
                else 
                {
                    console.log("creation workscouncilactuality Actuality ok");
                    res.send({status: 0, message: 'Insert in workscouncilactuality ok'});
                }
            });
        });
    console.log("**************************************");
    }

}

module.exports = new workcouncil();
