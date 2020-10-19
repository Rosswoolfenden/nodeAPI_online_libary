const mariadb = require('../database/mariaDbConnector');
const logging = require('../logging/WinstonLogging');
const bcrypt = require('bcrypt');
const { stringify } = require('uuid');

const log = logging.createLogger('User Model');

exports.registerUser =  async(body) => {
    try {
       // console.log(body);
        const hashpass = bcrypt.hashSync(body.password, 10);
        body.password = hashpass;
        const q = "INSERT INTO users SET ?";
        const result = await mariadb.sqlquery(q, body);
        if(result.affectedRows) {
            
            return {ID: result.insertId, success: true, ctxstatus: 201};
        } else {
            return false;
        }
        
    } catch (e) {
        log.error(e);
        return {Error: e}
    }
    
}

