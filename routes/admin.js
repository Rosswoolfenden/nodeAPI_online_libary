const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logging = require('../logging/WinstonLogging');
const model = require('../models/admin');

const log = logging.createLogger('Admin Routes');
const router = Router({prefix: '/api/v1/admin'});


router.post('/createDatabase', createDb);

/**
 * A router call to create a new database - admin only;
 * @param {Object} ctx The koa request/response object 
 */
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