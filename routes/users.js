const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logging = require('../logging/WinstonLogging');
const model = require('../models/users');
const {validateUser, validateUpdate} = require('../controllers/validation');
const { roles } = require('../permissons/roles');
const auth = require('../controllers/auth');


const log = logging.createLogger('Users Routes');
const router = Router({prefix: '/api/v1/users'});


router.post('/register', bodyParser(), validateUser, register);
router.delete('/:id([0-9]{1,})', auth, removeUser);
router.get('/', auth, login);
router.get('/getAllUsers', auth ,getAllUsers);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateUser ,updateUser);


async function register(ctx) {
    const body = ctx.request.body;
    try {  
        const res = await model.registerUser(body);
        console.log(res);
        ctx.status = 201;
        
        ctx.body = res;
    } catch (e) {
        log.error({Error: e.toString()});
        ctx.body = {Error: 'Server Error, please try again'};
    }
}

async function login(ctx){
    const user = ctx.state.user;
    ctx.body = {Success: `Hello ${user.username} you have logged on`};
}


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
        ctx.body = {Error: 'Server Error, please try again'};
    }
}


async function removeUser(ctx) {
    const user = ctx.state.user
    const paramsID = ctx.params.id;
    let grant;
    if(user.ID == paramsID) {
        grant = 'deleteOwn';
    } else {
        grant = 'deleteAny';
    }
    try {
        const permisson = roles.can(user.role)[grant]('profile');
        console.log(permisson);
        if(!permisson.granted) {
            ctx.status = 403;
            ctx.body = {Error : 'You do not have permission'};
        } else {
            const res = await model.deleteUser(paramsID);
            ctx.body =  res
        }
        
    } catch (e) {
        log.error(e.toString());
        ctx.body = {Error: 'Server Error, please try again laters'};
    }
}

async function updateUser(ctx) {
    const newDetails = ctx.request.body; 
    const user = ctx.state.user;
    const paramsID = ctx.params.id; 
    // if no id provided use own account id
    let grant;
    if(user.ID == paramsID) {
        log.debug('User updating own account');
        grant = 'updateOwn';
    } else {
        grant = 'updateAny';
    }
    try {
        const permisson = roles.can(user.role)[grant]('profile');
        console.log(permisson);
        if(!permisson.granted) {
            log.info('Not granted permisson')
            ctx.body = {Error: 'You do not have permissions to complete this action'}
        } else {
            const res =  await model.updateUser(paramsID, newDetails);
            ctx.body = res;
        }
    } catch(e) {
        console.log(e)
        ctx.body = {Error: 'Failed to update user, try again later'};
    }
}

module.exports = router;