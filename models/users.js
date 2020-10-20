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
        const q = 'INSERT INTO users SET ?';
        const result = await mariadb.sqlquery(q, body);
        if(result.affectedRows) {
            
            return {ID: result.insertId, success: true, ctxstatus: 201};
        } else {
            return false;
        }
        
    } catch (e) {
        log.error(e.toString());
        return {Error: e}
    }
}

exports.deleteUser = async(user) => {
    try {
        const query = 'DELETE FROM users WHERE ID = ?';
        const result = await mariadb.sqlquery(q, [user]);
        if (result.affectedRows) {
            return ({ID: id, success: true});
        } else {
            return ({ID: id, success: false});
        }
    } catch(e){
        log.error(JSON.stringify(e))
        return e;
    }
}

exports.findByUsernmae = async(username) => {
    try {
    const query = 'SELECT * FROM users WHERE username = ?;';
        const result = await mariadb.sqlquery(query, username);
        if(result.length === 1) {
            return result[0]
        } else {
            log.debug(username + ' does not exist in database');
            return false;
        }
    } catch(e) {
        console.log(e);
        return e;

    }
}
