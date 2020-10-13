const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logging = require('../logging/WinstonLogging');
const model = require('../models/admin');

const log = logging.createLogger('Admin Routes');
const router = Router({prefix: '/api/v1/admin'});


router.post('/createDatabase', createDb);


async function createDb(ctx) {
    try {
        const res = model.createDatabase();
        ctx.body = {sucsess: 'Succesfully created database'};
    } catch (e) {
        log.error({Error: e});
        ctx.body = {Error: 'Failed to create database errror -' + e};
    }
    // todo - add validation to check the user is a admin ;
}
    

module.exports = router;