const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logging = require('../logging/WinstonLogging');
const model = require('../models/users');
const {validateUser} = require('../controllers/validation');

const log = logging.createLogger('Users Routes');
const router = Router({prefix: '/api/v1/users'});


router.post('/register', bodyParser(), register);


async function register(ctx) {
    const body = ctx.request.body;
    log.info('thhe body is ' + body);
    try {  
        const res = await model.registerUser(body);
        ctx.status = res.ctxstatus;
        console.log(res);
        ctx.body = res;
    } catch (e) {
        log.error({Error: e});
        ctx.body = {Error:  e};
    }
}
    

module.exports = router;