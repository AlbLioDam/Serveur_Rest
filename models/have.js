var connection = require('../connection');
 
function Have() 
{
  
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
}

module.exports = new Have();