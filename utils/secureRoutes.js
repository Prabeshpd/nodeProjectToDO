const UserController = require("../modules/users/user.controller");

const SecureAPI = () => {
  return function(req, res, next) {
    var token = req.body.access_token || req.query.access_token || req.headers["access_token"];
    if (!token) throw "Must send access_token";

    UserController.validateToken(token)
      .then(t => {
        req.tokenData = t.data;
        next();
      })
      .catch(next);
  };
};

const SecureUI = () => {
  return function(req, res, next) {
    var token =
      req.cookies.access_token ||
      req.query.access_token ||
      req.body.access_token ||
      req.headers["access_token"];
    if (!token) {
      res.redirect("/login");
      res.end();
      return;
    }

    UserController.validateToken(token)
      .then(t => {
        req.tokenData = t.data;
        next();
      })
      .catch(err => {
        res.redirect("/login");
        res.end();
      });
  };
};

module.exports = { SecureUI, SecureAPI };
