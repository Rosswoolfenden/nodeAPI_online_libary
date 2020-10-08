const Koa = require('koa');
const config = require('./config');
const books = require('./routes/books');
const logging = require('./logging/WinstonLogging');


const connection = require('./database/mariaDbConnector');


const app = new Koa();
const log = logging.createLogger('Server');

let port = config.info.port;
conn = connection;
const q = 'SELECT 1 as val';
const p = null;
connection.query(q, p);

app.use(books.routes());

app.listen(port, () => log.info(`Public libary Api is now running on port ${port}`));