const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logging = require('../logging/WinstonLogging');
const auth = require('../controllers/auth');
const {validateRequestMsg} = require('../controllers/validation');
const { roles } = require('../permissons/roles');

// validateRequestMsg

const log = logging.createLogger('Requests Route');
const router = Router({prefix: '/api/v1/requests'});

router.get('/', auth, getMessages);
router.post('/sendRequest', auth,  validateRequestMsg, requestBook);
router.post('/sendMessage', auth, validateRequestMsg, sendMessage);

// get all of users messages
async function getMessages(ctx) {
    // get all meesages from a person

}

// DB -     chatid - bookid - userid -  message 

async function requestBook(ctx) {
    // get message 

    // create new chat id

    // add message with chat id
}

async function sendMessage(ctx){
    //  send meesages to person

    // get chat id

    // add message with that chat id

}



module.exports = router;