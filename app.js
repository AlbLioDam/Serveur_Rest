/**
* REST server NODE JS "SURICAT"
* This is the Ressources server for Intranet application SURICAT
*
*
**/

var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var cors = require('cors');
var app = express();

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8081'}));
app.options('*', cors());

/*--Parser --*/
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/*-- Allow CORS for cross origin--*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* -- Instanciate routes -- */
var index = require('./routes/index');
var ActualityRouter = require('./routes/ActualityRouter');
var BelongToRouter = require('./routes/BelongToRouter');
var DepartmentRouter = require('./routes/DepartmentRouter');
var NotifyRouter = require('./routes/NotifyRouter');
var RdvRouter = require('./routes/RdvRouter');
var TaskRouter = require('./routes/TaskRouter');
var TeamRouter = require('./routes/TeamRouter');
var ToolRouter = require('./routes/ToolRouter');
var UserRouter = require('./routes/UserRouter');
var MessageRouter = require('./routes/MessageRouter');
var ToDoRouter = require('./routes/ToDoRouter');
var TeamActualityRouter = require('./routes/TeamActualityRouter');
var CorporateLifeActualityRouter = require('./routes/CorporateLifeActualityRouter');

/*-- Routes V2 --*/
//var WorksCouncilActualityRouter = require('./routes/WorksCouncilActualityRouter');
//var TodoRouter = require('./routes/TodoRouter');
//var LeisureActualityRouter = require('./routes/LeisureActualityRouter');
//var PostCommentRouter = require('./routes/PostCommentRouter');
//var GotShortcutRouter = require('./routes/GotShortcutRouter');
//var GotToolRouter = require('./routes/GotToolRouter');
//var HaveRouter = require('./routes/HaveRouter');

var connection = require('./connection');

/* -- connect to mysql -- */
connection.init();

/* -- adress http used to comunicate with REST */
app.use('/actuality', ActualityRouter);
app.use('/Belongto', BelongToRouter);
app.use('/Department', DepartmentRouter);
app.use('/index', index);
app.use('/Notify', NotifyRouter);
app.use('/Rdv', RdvRouter);
app.use('/Task', TaskRouter);
app.use('/Tool', ToolRouter);
app.use('/User', UserRouter);
app.use('/message', MessageRouter);
app.use('/todo', ToDoRouter);
app.use('/teamActuality', TeamActualityRouter);
app.use('/team',TeamRouter);
app.use('/corpActuality', CorporateLifeActualityRouter);

/*-- App use V2--*/
//app.use('/Works', WorksCouncilActualityRouter);
//app.use('/Leisure', LeisureActualityRouter);
//app.use('/Todo', TodoRouter);
//app.use('/PostComment', PostCommentRouter);
//app.use('/Message', MessageRouter);
//app.use('/GotShortcut', GotShortcutRouter);
//app.use('/GotTool', GotToolRouter);
//app.use('/Have', HaveRouter);


/*-- Listen port --*/
app.listen(3000)

module.exports = app;



console.log("                _           _        _");
console.log("               (_)         | |      | |");
console.log(" ___ _   _ ____ _  ___ ____| |_     | | ___");
console.log("/ __| | | |  __| |/ __/    | __/  _ | |/ __|");
console.log("\\__\\| |_| | |  | | (_| (_| | |   | |/ |\\__\\");
console.log("|___/\\__,_|_|  |_|\\___\\__,_|_|    \\__/ |___/");


console.log(" _                          _                   ");
console.log("| |                        | |                  ");
console.log("| |     ___    ___ ___ _ __| |__   ___ _ __ ___ ");
console.log("| |    / _ \\  / __/ _ \\ '__| '_ \\ / _ \\ '__/ _ \\");
console.log("| |___|  __/ | (_|  __/ |  | |_) |  __/ | |  __/");
console.log("\\_____/\\___|  \\___\\___|_|  |_.__/ \\___|_|  \\___|"); 

console.log("    **********************************");
console.log("    * Welcome To Suricat REST Server **");
console.log("    *                                **");
console.log('    *      Server is running         **');
console.log("    *                                **");
console.log("    *         MIT Licence            **");
console.log("    *    Alban / Lionel / Damien     **");
console.log("    ***********************************");
console.log("     **********************************");

