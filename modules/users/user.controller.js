const config = require("config");
const { ObjectId } = require("mongoose").Types;

const appSecret = config.get("app.secret");
const { generateRandomPassword, ERR } = require("../../utils/index");
const Token = require("../../utils/tokenManager");
const UserModel = require("../users/user.model");
const SecureCrypto = require("../../utils/encrypt_decrypt");

const tokenManager = new Token({ appSecret });

const throwError = err => {
  throw Error(err);
};

// const createTokenData = async user => {
//   let permissions = await RoleController.calculatePermissions(user.roles);
//   return {
//     permissions
//   };
// };

class Controller {
  constructor() {
    this.jwtDuration = 1000 * 60 * 2;
  }

  async add(userPayload) {
    let password = await SecureCrypto.saltAndHash(userPayload.password);
    userPayload.password = {
      hash: password.hash.toString("base64"),
      salt: password.salt.toString("base64")
    };

    return UserModel.create(userPayload);
  }

  async authenticate({ username, password }) {
    let tokenData = null;
    let user = await this.verifyLogin({ username, password });
    let token = await this.generateToken(user);
    let userWithToken = Object.assign({}, { user }, { token });
    return userWithToken;
  }

  async checkUserName(username) {
    let user = await UserModel.findOne({ username });
    return user ? true : false;
  }

  async authenticateExternal({ service_id, extras }) {
    let user = await UserModel.findOne({ service_id });
    if (!user) {
      if (extras.email) {
        user = await UserModel.findOne({ email: extras.email });
        user = await UserModel.findOneAndUpdate(
          { email: extras.email },
          { $addToSet: { service_id } },
          { new: true }
        );
      }
      if (!user) {
        user = await this.registerByExternal({ service_id, extras });
      }
    }
    let token = await this.generateToken(user);
    user.token = token;
    return user;
  }

  async create(userPayload) {
    if (!userPayload.userName) throw ERR.USERNAME_REQ;

    userPayload = Object.assign(
      {},
      {
        name: userPayload.name,
        password: userPayload.password,
        gender: userPayload.gender,
        email: userPayload.email,
        phone: userPayload.phone,
        username: userPayload.username
      }
    );
    return this.add(userPayload);
  }

  async getByUsername({ username }) {
    return UserModel.findOne({ username: username });
  }

  getById(id) {
    return UserModel.findOne({ _id: ObjectId(id) });
  }

  async generateToken(user, tokenData = {}) {
    let data = {};
    if (typeof tokenData === "function") data = await tokenData(user);
    else data = tokenData;
    Object.assign(data, {
      user_id: user.id,
      name_first: user.name
    });

    return tokenManager.generate(data, this.jwtDuration);
  }

  login({ username, password }) {
    return this.authenticate({ username, password });
  }

  registerByExternal({ service_id, extras }) {
    let { email, name, phone } = extras;
    let password = generateRandomPassword(8);
    let payload = Object.assign({}, { email, phone, name, service_id, password, username: email });

    return this.add(payload);
  }

  validateToken(token) {
    return tokenManager.validate(token);
  }

  async verifyLogin({ username, password, type }) {
    if (!username) throw "UserName is required";
    if (!password) throw "Password is required";
    let user = await this.getByUsername({ username });

    if (!user) {
      throw "Invalid Login Options";
    }

    password = await SecureCrypto.hash(password, Buffer.from(user.password.salt, "base64"));
    if (user.password.hash !== password.hash.toString("base64"))
      throw Error("Invalid Login Options");
    user.password = null;

    return user;
  }
}

module.exports = new Controller();
