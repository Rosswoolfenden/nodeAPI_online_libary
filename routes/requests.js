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

router.get('/getRequests/:id([0-9]{1,})', auth, getRequests);
router.get('/getSent/:id([0-9]{1,})', auth, getSentRequests);


router.get('/chats', auth, getChats);
router.get('/chat/:id([0-9]{1,})', auth, getChatMessages);
router.post('/sendRequest', auth,  bodyParser(), validateRequestMsg, requestBook);
router.post('/sendmsg', auth, bodyParser(), validateRequestMsg, sendMsg);
// router.post('/sendMessage', auth, validateRequestMsg, sendMessage);
router.post('/respondRequest', auth, bodyParser(), respondToRequest);

// get all of users messages
async function respondToRequest(ctx) {
    const user =  ctx.state.user;
    // userid // bookid 
    // 
    const body = ctx.request.body;
    try {
        const res = await model.respond(body);
        ctx.status = 201;
        ctx.body = res;
    } catch(e) {
        log.error(e);
        ctx.status = 400;
    }


}

// DB -     chatid - bookid - userid -  message 

async function requestBook(ctx) {
    const user =  ctx.state.user;
    const requestDetails = ctx.request.body;
    requestDetails.requesterId = user.ID;
    requestDetails.requestername = user.firstName;
    requestDetails.sender_name = user.firstName;
    try {
        const res = await model.bookRequest(requestDetails);
        if(res) {
            ctx.status = 201;
            ctx.body = res;
        } else {
            ctx.status = 400;
            ctx.body = false;
        }
        

    } catch (e) {
        ctx.status = 400;
        log.error(e);
    }
}

async function getRequests(ctx) {
    const user =  ctx.state.user;
    const chatDetails ={};
    chatDetails.requesterId = ctx.params.id;
    chatDetails.ownerId = user.ID;
    chatDetails.sender_name = user.firstName;

    log.info(chatDetails);
    try {
        const res = await model.getRequests(chatDetails);
        if(!res) {
            ctx.status = 400;
            ctx.body = {Error: "Not chat available"}
        } else {
            ctx.status = 201;
            ctx.body = res;
        }
        
    } catch(e) {
        log.error(e);
        ctx.status = 400;

    }
} 

async function getSentRequests(ctx) {
    const user =  ctx.state.user;
    const chatDetails ={};
    chatDetails.ownerId = ctx.params.id;
    chatDetails.requesterId = user.ID;
    chatDetails.sender_name = user.firstName;
    try {
        const res = await model.getSent(chatDetails);
        if(!res) {
            ctx.body = false;
        } else {
            ctx.status = 201;
            ctx.body = res;
        }
        
    } catch(e) {
        log.error(e);
        ctx.status = 400;

    }
}


async function getChatMessages(ctx) {
    const chatId = ctx.params.id;
    try {
        res = await model.getChatFromId(chatId);
        console.log(res);
        ctx.status = 200;
        ctx.body = res;

    } catch (e) {
        log.error(e);
        ctx.status = 400;
    }
}

async function getChats(ctx) {
    const user = ctx.state.user;
    
    try {
        res = await model.getChats(user.ID);
        ctx.status = 200;
        ctx.body = res;
    } catch(e) {
        log.error(e);
        ctx.status =400;
    }
}

async function sendMsg(){
    const message = ctx.request.body;
    try {
        const res = await model.sendMsg(message);
        ctx.status =200;
        ctx.body = res;
    } catch (e) {
        log.error(e);
        ctx.status = 400;
    }
}



module.exports = router;