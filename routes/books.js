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
router.get('/', getAllBooks);
router.get('/mybooks', auth, getAllUserBooks);
router.get('/:id([0-9]{1,})', auth, getBookById);

router.delete('/:id([0-9]{1,})', auth, deleteBook);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateBook, updateBook );

/**
 * Router call to add book to database
 * @param {Object} ctx -The koa Request/response object
 */
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


/**
 * Router caller to get all books from database
 * @param {object} ctx - The koa Request/response object 
 */
async function getAllBooks(ctx) {
    try {
        const res = await model.getAll();
        ctx.status = 200;
        ctx.body = res;

    } catch(e){
        log.error(e);
        ctx.body = {Error: 'Failed to compelte action'}
    }
}

/**
 * Router call to get all books who are owned by user 
 * @param {Object} ctx - The koa Request/response object 
 */
async function getAllUserBooks(ctx) {
    const user = ctx.state.user;
    try {
        const res = await model.getUserBooks(user.ID);
        ctx.body = res;
    } catch(e) {
        log.error(e);
        ctx.status = 400;
    }
}

/**
 * Get Book by Id router call
 * @param {Object} ctx - The koa Request/response object 
 */
async function getBookById(ctx) {
    const bookId = ctx.params.id;
    try {
        let res = await model.getId(bookId);
        ctx.body = res;

    } catch(e) {
        ctx.body = {Error : 'Failed to get book, try again later'};
    }
}

/**
 * Route to delte a book from the database
 * @param {Object} ctx - The koa Request/response object 
 */
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


/**
 * Route to update book
 * @param {Object} ctx - The koa Request/response object  
 */
async function updateBook(ctx) {
    const user =  ctx.state.user;
    const bookID = ctx.params.id;
    const updatedBook = ctx.request.body;
    updatedBook.ID = bookID;

    try {
        res = await model.updateBook(updatedBook, user);
        ctx.body = res;

    } catch(e) {
        log.error(e);
        ctx.body = {Error: 'Failed to update book, try again'};
    }
}
module.exports = router;