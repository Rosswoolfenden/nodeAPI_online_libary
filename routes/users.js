const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logging = require('../logging/WinstonLogging');
const model = require('../models/users');
const {validateUser} = require('../controllers/validation');

const log = logging.createLogger('Users Routes');
const router = Router({prefix: '/api/v1/users'});


router.post('/register', bodyParser(), validateUser, register);


async function register(ctx) {
    const body = ctx.request.body;
    try {  
        const res = await model.registerUser(body);
        console.log(res.ctxstatus);
        ctx.status = 201;
        console.log(res);
        ctx.body = res;
    } catch (e) {
        log.error({Error: e.toString()});
        ctx.body = {Error:  e.toString()};
    }
}
    

module.exports = router;