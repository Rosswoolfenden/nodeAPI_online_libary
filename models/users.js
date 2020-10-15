const mariadb = require('../database/mariaDbConnector');
const logging = require('../logging/WinstonLogging');
const bcrypt = require('bcrypt');
const { stringify } = require('uuid');

const log = logging.createLogger('User Model');

exports.registerUser =  async(body) => {
    try {
        log.info(body.email);
        log.info(body.password);
        const keys =  Object.keys(body);
        const vals = Object.values(body); 
        const params = [keys, vals];
        const hashpass = bcrypt.hashSync(body.password, 10);
        body.password = hashpass;
        const q = 'INSERT INTO users ? VALUES ?';
        const result = await mariadb.sqlquery(q,params );
        console.log(JSON.stringify(result));
        return true;
    } catch (e) {
        console.log(e);
    }
    
}

