
const {Validator, ValidationError} = require('jsonschema');

// const articleSchema = require('../schemas/article.json').definitions.article;
// const categorySchema = require('../schemas/category.json').definitions.category;
// const commentSchema = require('../schemas/comment.json').definitions.comment;


const userSchema = require('../schema/users.json').definitions.user;
// const userUpdateSchema = require('../schemas/user.json').definitions.userUpdate;

const makeValidator = (schema, resource) => {

  const v = new Validator();
  const validationOptions = {
    throwError: true,
    propertyName: resource
  };
  

  const handler = async (ctx, next) => {
 
    const body = ctx.request.body;

    try {
      v.validate(body, schema, validationOptions);
      await next();
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error(error);
        ctx.body = {message: error.stack};
        ctx.status = 400;      
      } else {
        throw error;
      }
    }
  }
  return handler;
}

exports.validateUser = makeValidator(userSchema, 'user');
