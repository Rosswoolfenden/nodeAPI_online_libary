const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logging = require('../logging/WinstonLogging');
const auth = require('../controllers/auth');

const log = logging.createLogger('Requests Route');
const router = Router({prefix: '/api/v1/requests'});

router.get('/', auth, getMessages);


async function getMessages(ctx) {

}

module.exports = router;