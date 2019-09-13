const config = require("config");
class APPError extends Error {
  constructor(message, name, httpCode) {
    super();
    this.message = message;
    this.data = {
      group: config.get("app.name"),
      type: "error",
      message: message,
      name: name || "none",
      httpCode: httpCode || 500
    };
    this.status = httpCode || 500;
    this.className = this.constructor.name;
    this.stack = new Error(message).stack;
  }
}

const ERR = {
  TOKON_REQ: new APPError("Must send access_token", "token_req", 401),
  TOKEN_INVALID: new APPError(
    "Token is invalid or expired. Please get a new one.",
    "token_invalid",
    401
  ),
  UNAUTHORIZED: new APPError("Unauthorized access", "unauthorized", 401),
  USERNAME_REQ: new APPError("Username is required", "username_req", 400)
  //DEFAULT: new APPError('', '', 400),
};

const throwError = err => {
  throw err;
};
module.exports = {
  Error: APPError,
  ERR,
  throwError
};
