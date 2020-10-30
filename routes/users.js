const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logging = require('../logging/WinstonLogging');
const model = require('../models/users');
const {validateUser} = require('../controllers/validation');
const { roles } = require('../permissons/roles');
const auth = require('../controllers/auth');


const log = logging.createLogger('Users Routes');
const router = Router({prefix: '/api/v1/users'});


router.post('/register', bodyParser(), validateUser, register);
router.delete('/:id([0-9]{1,})', auth, removeUser);
router.get('/', auth, login);
router.get('/perm', auth ,getAllUsers)


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
        ctx.body = {err: 'user does not exits'};
    }
}

async function login(ctx){
    const user = ctx.state.user;
    ctx.body = {Success: `Hello ${user.username} you have logged on`};
}


// async function getUser(ctx) {
//     try {
//         let user = await model.findByUsernmae('rosswoolfenden');
//         ctx.body = user;
//     } catch (e) {
//         ctx.body = {err: e.toString()};
//     }
// }

async function getAllUsers(ctx) {
    try {

        const permission = roles.can(ctx.state.user.role)['readAny']('profile');

        console.log(permission);
        if(!permission.granted) {
            ctx.status = 403;
            ctx.body = {Error: 'You do not have permissions to complete this action'}
        } else {
            
            ctx.body = await model.getAllUsers()
        }

    }catch(e){
        ctx.body = {Error: 'This did not work'};
    }
}


async function removeUser(ctx) {
    // to do auth to make sure user is the one delteing 
    const userID = ctx.params.id;
    const user = ctx.state.user;
    log.info()
    try {
        
        const res = await model.deleteUser(userID);
        ctx.body =  ({user : res});
    } catch (e) {
        log.error(e.toString());
        ctx.body = {Error: e.toString()};
    }
}
    

module.exports = router;