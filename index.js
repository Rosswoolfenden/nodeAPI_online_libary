const Koa = require('koa');
const config = require('./config');
const books = require('./routes/books');
const admin = require('./routes/admin');
const user = require('./routes/users');
const logging = require('./logging/WinstonLogging');
const db = require('./database/mariaDbConnector');
const app = new Koa();
const log = logging.createLogger('Server');
const port = config.info.port;


// check the API can connect to the mariadb mysql database;
async function checkdbconnection() {
    try { 
        const dbconnect = await db.sqlquery('SELECT 1 as val', null);
        log.info('Connected to database');
    } catch (e) {
        // catches if can not connect to database;
        log.error('Failed to connect to database');
    }

}   
// test connection with mariadb database;
checkdbconnection();

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,append,delete,entries,foreach,get,has,keys,set,values,Authorizatio');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
  });


app.use(books.routes());
app.use(admin.routes());
app.use(user.routes());


app.listen(port, () => log.info(`Public libary Api is now running on port ${port}`));