const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logging = require('../logging/WinstonLogging');
const model = require('../models/users');

const log = logging.createLogger('Users Routes');
const router = Router({prefix: '/api/v1/users'});


router.post('/register', bodyParser(), register);


async function register(ctx) {
    const body = ctx.request.body;
    log.info('thhe body is ' + body);
    try {  
        const res = model.registerUser(body);
        ctx.body = {sucsess: res};
    } catch (e) {
        log.error({Error: e});
        ctx.body = {Error: 'Failed to create database errror -' + e};
    }
    // todo - add validation to check the user is a admin ;
}
    

module.exports = router;