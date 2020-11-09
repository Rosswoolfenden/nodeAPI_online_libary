const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
  ac.grant('basic')
    .readOwn('profile')
    .updateOwn('profile')
    .deleteOwn('profile')
    .deleteOwn('books')
    .updateOwn('books')
    

  ac.grant('admin')
    .extend('basic')
    .readAny('profile')
    .updateAny('profile')
    .deleteAny('profile')
    .updateAny('books')
    .deleteAny('books')

  return ac;
})();