const passport = require('koa-passport');
const basicAuth = require('../strategies/basic');

passport.use(basicAuth);
// todo 0auth authentication 
module.exports = passport.authenticate(['basic'], {session:false});