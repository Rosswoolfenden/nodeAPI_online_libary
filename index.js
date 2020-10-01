const Koa = require('koa');
const config = require('./config');
const books = require('./routes/books');
const logging = require('./logging/WinstonLogging');


const app = new Koa();
const log = logging.createLogger('Server');

let port = config.port;


app.use(books.routes());


log.info('the port it ' + port);
app.listen(port, () => log.debug(`Public libary Api is now running on port ${port}`));