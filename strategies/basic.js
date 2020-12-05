const basic = require('passport-http').BasicStrategy;
const model = require('../models/users');
const logging = require('../logging/WinstonLogging');
const log = logging.createLogger('Basic Auth');
const bycrpt = require('bcrypt');

// check hased pass with inputed pass
const passMatch = function(dbpassword, inpassword) {
    const match = bycrpt.compareSync(inpassword, dbpassword);
    return match;
}

const BasicStrategycb = async(username, password, done) => { 
      //done is error or results
    console.log(username);
    console.log(password);
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