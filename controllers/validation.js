
const {Validator, ValidationError, validate} = require('jsonschema');
const logger = require('../logging/WinstonLogging');

const bookSchema = require('../schema/book.json').definitions.books;
const user = require('../schema/users.json').definitions.user;
const userUpdate = require('../schema/users.json').definitions.userUpdate;
const log = logger.createLogger('Validation');

const makeValidator = (schema, resource) => {
  log.info(schema);
  log.info(resource);
  const v = new Validator();
  const validationOptions = {
    throwError: true,
    propertyName: resource
  };
  

  const handler = async (ctx, next) => {
    log.debug('validating');
    const body = ctx.request.body;

    try {
      v.validate(body, schema, validationOptions);
      await next();
    } catch (error) {
      log.info(error);
      if (error instanceof ValidationError) {
        log.error(error);
        ctx.body = {message: error.stack};
        ctx.status = 400;      
      } else { 
        throw error;
      }
    }
  }
  return handler;
}

exports.validateUser = makeValidator(user, 'user');
// exports.validateUpdate = makeValidator(userUpdate, 'userUpdate');
exports.validateBook = makeValidator(bookSchema, 'book');
