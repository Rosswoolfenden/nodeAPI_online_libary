const mariadb = require('../database/mariaDbConnector');
const logging = require('../logging/WinstonLogging');
const bcrypt = require('bcrypt');
const { stringify } = require('uuid');
const { query } = require('winston');
const { validateUpdate } = require('../controllers/validation');

const log = logging.createLogger('User Model');

/**
 * A Function to call the sql query to add the given user to the databse
 * @param {Object} body An object containing the details for the new user
 */
exports.registerUser =  async(body) => {
    try {
       // console.log(body);
        const hashpass = bcrypt.hashSync(body.password, 10);
        body.password = hashpass;
        const q = 'INSERT INTO users SET ?';
        const result = await mariadb.sqlquery(q, body);
        if(result.affectedRows) {
            log.info('succesfully added user')
            return {ID: result.insertId, success: true, message: `succsefully registered user ${result.insertId}`, ctxstatus: 201};
        } 
        
    } catch (e) {
        log.error(e.toString());
        return {Error: e}
    }
}

/**
 * A function to call sql query to delete account of the given user
 * @param {Int} id The user id who will be deleted 
 */
exports.deleteUser = async(id) => {
    log.info(id);
    // no need to check if user exist, as already been authirized by passport
    const query = 'DELETE FROM users WHERE ID = ?';
    const result = await mariadb.sqlquery(query, [id]);
    if (result.affectedRows) {
        log.info(`deleted user ${id}`);
        return ({ID: id, success: true, message: `Sucsesfully deleted user ${id}`});
    } else {
        log.info(`deleted user ${id}`);
        return ({ID: id, success: false, message: `Failed to deleted user ${id}`});
    }
}

/**
 * A function to call sql query to get account detials for given user
 * @param {String} username The username provided to find account fromd b
 */
exports.findByUsernmae = async(username) => {
        
    const query = 'SELECT * FROM users WHERE username = ?;';
        const result = await mariadb.sqlquery(query, username);
        if(result.length === 1) {
            return result[0]
        } else {
            log.debug(username + ' does not exist in database');
            return false;
        }
}
/**
 * Function to return all the user from the database 
 */
exports.getAllUsers = async() => {
    const query = 'SELECT * FROM users;'
    const result =  await mariadb.sqlquery(query, []);
    return result;
}


/**
 * A function to call sql query to update given user
 * @param {Int} id The id of the user to update
 * @param {Object} newDetails The new details of the user
 */
exports.updateUser = async(id, newDetails) => {
    log.info('we are here');
    const query = 'UPDATE users SET ? WHERE ID = ?;'
    console.log(newDetails);
    //user might change details thats not their passowrd
    if (newDetails.password != null) {
        log.info('changing password - re hasing')
        const hashPass = bcrypt.hashSync(newDetails.password, 10);
        newDetails.password = hashPass;
    }
    const result = await mariadb.sqlquery(query, [newDetails, id]);
    if(result.affectedRows){
        return {ID: id, updated: true, message: 'Sucessfully updated profile'};
    } else {
        return {ID: id, updated: false,  message: 'Failed to update profile'};
    };
}

/**
 * Function get the adress of the given user 
 * @param {Int} userId Id of the user 
 */
exports.getAdress = async(userId) => {
    const query = 'SELECT * FROM users WHERE ID = ?';
    const params = [userId];
    const result = await mariadb.sqlquery(query, params);
    try {
        const adress = result[0].adress;
        return adress
    } catch(e) {
        log.error("No adress for use " + userId);
        return false;
    }
    
}
