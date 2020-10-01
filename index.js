const Koa = require('koa');
const config = require('./config');
const books = require('./routes/books');
const app = new Koa();


let port = config.port;


app.use(books.routes());


log.info('the port it ' + port);
app.listen(port, () => console.log(`Public libary Api is now running on port ${port}`))