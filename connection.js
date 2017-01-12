/**
 * module to connect to mysql database
 * database is store on Lionel desktop
 */
var mysql = require('mysql');
 
function Connection() 
{
  this.pool = null;
 
  this.init = function() 
  {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      //Lionel
      host: '10.111.61.81',
      user: 'cdi',
      password: 'cdi',
      
/*      host: 'localhost',
      user: 'root',
      password: '',*/
      database: 'suricat'
    });
  };
 
  this.acquire = function(callback) 
  {
    this.pool.getConnection(function(err, connection) 
    {
      callback(err, connection);
    });
  };
}
 
module.exports = new Connection();