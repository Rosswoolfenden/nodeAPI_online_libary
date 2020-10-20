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

const BasicStrategycb = async(username, password, done) => {   //done is error or results
    let user;
    try{
        user = await model.findByUsernmae(username)
        if(passMatch(user.password, password)){
            log.debug('Passwords match');
            return done(null, user);
        } else {
            return(null, false);
        }
    } catch (e){
        return done(error);
    }
}



// const strategy = new BasicStrategy(BasicStrategycb);
const strategy =  new basic(BasicStrategycb);
module.exports = strategy; 