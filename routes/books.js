const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logging = require('../logging/WinstonLogging');
const auth = require('../controllers/auth');
const {validateBook} = require('../controllers/validation');
const model =  require('../models/books');

const log = logging.createLogger('Books Route');
const router = Router({prefix: '/api/v1/books'});

router.post('/add', auth, bodyParser(), validateBook, addBook);
router.get('/', getAllBooks);

async function getAllBooks(ctx) {
    log.info(' i have been called');
    ctx.body = {sucsess: 'The API call worked, well done '};
}

async function addBook(ctx) {
    const book = ctx.request.body;
    const user =  ctx.state.user;
    book.ownerId = user.ID;
    try {
        res = await model.addBook(book);
        ctx.body = res;
    } catch (e) {
        ctx.body = {Error: 'Server error, try again later'};
    }
}
async function getByCategory (ctx) {
    const category = ctx.body.category;
    try {
        ctx.body = {sucsess: category};

    } catch (e) {
        ctx.body = {Error: 'Server error, try again later'};
    }
}


async function getBookById(ctx) {
    log.info('i have been called ');
    ctx.body = {sucsess: 'this api call worked'};
}

module.exports = router;