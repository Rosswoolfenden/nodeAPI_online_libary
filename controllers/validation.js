
const {Validator, ValidationError, validate} = require('jsonschema');

// const articleSchema = require('../schemas/article.json').definitions.article;
// const categorySchema = require('../schemas/category.json').definitions.category;
// const commentSchema = require('../schemas/comment.json').definitions.comment;

const logger = require('../logging/WinstonLogging');
const user = require('../schema/users.json').definitions.user;
const userUpdate = require('../schema/users.json').definitions.userUpdate;
const log = logger.createLogger('Validation');

const makeValidator = (schema, resource) => {

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
      if (error instanceof ValidationError) {
        log.error(error);
        ctx.body = {message: error.stack};
        ctx.status = 400;      
      } else { 
        log.error(error);
        throw error;
      }
    }
  }
  return handler;
}

exports.validateUser = makeValidator(user, 'user');
exports.validateUpdate = makeValidator(userUpdate, 'userUpdate');
