const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logging = require('../logging/WinstonLogging');
const auth = require('../controllers/auth');
const {validateRequestMsg} = require('../controllers/validation');
const model = require('../models/requests');
const { roles } = require('../permissons/roles');

// validateRequestMsg

const log = logging.createLogger('Requests Route');
const router = Router({prefix: '/api/v1/requests'});

router.get('/', getMessages);
router.post('/sendRequest', auth,  bodyParser(), validateRequestMsg, requestBook);
router.post('/sendMessage', auth, validateRequestMsg, sendMessage);

// get all of users messages
async function getMessages(ctx) {
    // // get all meesages from a person
    // const user = ctx.state.user;
    ctx.body = "YAY"


}

// DB -     chatid - bookid - userid -  message 

async function requestBook(ctx) {
    const user =  ctx.state.user;
    const requestDetails = ctx.request.body;
    requestDetails.requesterId = user.ID;
    try {
        const res = await model.bookRequest(requestDetails);
        if(res) {
            ctx.status = 200;
            ctx.body = res;
        } else {
            ctx.status = 400;
            ctx.body = {Error: "Failed to send message"}
        }
        

    } catch (e) {
        ctx.status = 400;
        log.error(e);
    }
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