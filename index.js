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


app.use(books.routes())
app.use(admin.routes());
app.use(user.routes());


app.listen(port, () => log.info(`Public libary Api is now running on port ${port}`));