const JWT = require("jsonwebtoken");
const SecureCrypto = require("./encrypt_decrypt");
const { ERR } = require("./error");

class TokenManager {
  constructor({ appSecret }) {
    if (!appSecret) throw "App Secret Required";
    this.secret = appSecret;
  }

  generate(data, jwt_duration) {
    return JWT.sign(
      {
        data: SecureCrypto.encrypt(JSON.stringify(data), this.secret)
      },
      this.secret,
      {
        expiresIn: jwt_duration
      }
    );
  }

  validate(token) {
    var me = this;
    return new Promise((resolve, reject) => {
      JWT.verify(token, me.secret, (err, tokenData) => {
        if (err) throw ERR.TOKEN_INVALID;
        let data = tokenData.data || false;
        if (data) {
          data = JSON.parse(SecureCrypto.decrypt(data, me.secret));
        }
        resolve({ data, tokenData });
      });
    });
  }
}

module.exports = TokenManager;
