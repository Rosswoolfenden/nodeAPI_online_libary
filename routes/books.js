const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logging = require('../logging/WinstonLogging');

const log = logging.createLogger('Books Route');


const router = Router({prefix: '/api/v1/books'});

router.get('/', getAllBooks);

async function getAllBooks(ctx) {
    log.info(' i have been called');
    ctx.body = {sucsess: 'The API call worked, well done '};
}

module.exports = router;