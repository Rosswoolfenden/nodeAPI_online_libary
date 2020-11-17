const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logging = require('../logging/WinstonLogging');
const auth = require('../controllers/auth');
const {validateBook} = require('../controllers/validation');
const model =  require('../models/books');
const { roles } = require('../permissons/roles');

const log = logging.createLogger('Books Route');
const router = Router({prefix: '/api/v1/books'});

router.post('/add', auth, bodyParser(), validateBook, addBook);
router.get('/', auth, getAllBooks);
router.get('/:id([0-9]{1,})', auth, getBookById);
router.delete('/:id([0-9]{1,})', auth, deleteBook);

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

async function getAllBooks(ctx) {
    try {
        let res = await model.getAll();
        ctx.body = res;

    } catch(e){
        log.error(e);
        ctx.body = {Error: 'Failed to compelte action'}
    }
}


async function getBookById(ctx) {
    const bookId = ctx.params.id;
    try {
        let res = await model.getId(bookId);
        ctx.body = res;

    } catch(e) {
        ctx.body = {Error : 'Failed to get book, try again later'};
    }
}

async function deleteBook(ctx) {
    const user = ctx.state.user;
    const book = ctx.params.id;
    ctx.body = user;
    try {
        res = await model.delBook(book, user);
        ctx.body = res;
    } catch(e){
        log.error(e);
        ctx.body = {Error: 'Failed to delete book, try again'};
    }
}
module.exports = router;