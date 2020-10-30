const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
  ac.grant("basic")
    .readOwn("profile")
    .updateOwn("profile")
    .deleteOwn('profile')

  ac.grant("admin")
    .extend("basic")
    .readAny("profile")
    .updateAny("profile")
    .deleteAny("profile")

  return ac;
})();