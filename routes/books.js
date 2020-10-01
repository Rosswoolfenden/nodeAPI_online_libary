const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');


const router = Router({prefix: '/api/v1/books'});

router.get('/', getAllBooks);

async function getAllBooks(ctx) {
    console.log(' i have been called');
    ctx.body = {sucsess: 'The API call worked, well done '};
}

module.exports = router;