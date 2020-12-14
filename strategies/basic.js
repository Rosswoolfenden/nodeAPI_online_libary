const basic = require('passport-http').BasicStrategy;
const model = require('../models/users');
const logging = require('../logging/WinstonLogging');
const log = logging.createLogger('Basic Auth');
const bycrpt = require('bcrypt');

/**
 * A function to test if the user entered passwords matches the one saved in the databses
 * @param {String} dbpassword Password that is saved in the database
 * @param {String} inpassword Password that has been entered by the user
 */
const passMatch = function(dbpassword, inpassword) {
    const match = bycrpt.compareSync(inpassword, dbpassword);
    return match;
}

/**
 * The basic strategy for logging in userrs
 * @param {String} username The userer entered username
 * @param {String} password the user entered password   
 * @param {Object} done The doen object to check if it pass/fails the log in
 */
const BasicStrategycb = async(username, password, done) => { 
      let user;

    try {
        user = await model.findByUsernmae(username);
        if(!user) {
            log.info('user does not exist');
            return done(null, false);
        }

    } catch(e) {
        log.error(`Errror : Failed to find ${username} in table`);
        return done(e);
    }

    try{
        if(passMatch(user.password, password)){
            log.info('Passwords match');
            return done(null, user);
        } else {
            log.info("passowrds do not match ");
            return done(null, false);
        }
    } catch(e){
        return done(e);
    }
}



// const strategy = new BasicStrategy(BasicStrategycb);
const strategy =  new basic(BasicStrategycb);
module.exports = strategy; 