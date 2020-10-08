const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logging = require('../logging/WinstonLogging');

const log = logging.createLogger('Books Route');
const router = Router({prefix: '/api/v1/books'});

router.get('/', getAllBooks);
router.get('/id', getBookById);
router.get('/category', getByCategory);

async function getAllBooks(ctx) {
    log.info(' i have been called');
    ctx.body = {sucsess: 'The API call worked, well done '};
}


async function getByCategory (ctx) {
    const category = ctx.body.category;
    try {
        ctx.body = {sucsess: category};

    } catch (e) {
        throw e;
        ctx.body = {Error: 'Failed to retrived'}
    }
}


async function getBookById(ctx) {
    log.info('i have been called ');
    ctx.body = {sucsess: 'this api call worked'};
}

module.exports = router;