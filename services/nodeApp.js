const config = require("config");
const fs = require("fs");

const NetworkInterceptor = require("./networkInterceptor");

const credentialsPath = __dirname + "/../config/auth_test.json";
const baseUrl = config.get("services.test.url");

class Test {
  async auth() {
    let response = await new NetworkInterceptor({
      url: `${baseUrl}login_process`,
      data: {
        username: config.get("services.test.username"),
        password: config.get("services.test.password")
      },
      headers: { "Content-Type": "application/json" },
      method: "POST"
    }).methodInvocation();
    fs.writeFileSync(credentialsPath, JSON.stringify(response.token, null, 4));
    return response.token;
  }

  async getToken() {
    try {
      if (!fs.existsSync(credentialsPath)) await this.auth();

      let credentials = fs.readFileSync(credentialsPath);
      let data = await JSON.parse(credentials);
      if (!data) return "NO-TOKEN";
      return data;
    } catch (e) {
      return "NO-TOKEN";
    }
  }

  async request(config) {
    config.headers = config.headers || {};
    config.headers["Content-Type"] = "application/json";
    config.headers["access_token"] = await this.getToken();
    try {
      let res = await new NetworkInterceptor(config).methodInvocation();
      if (res.success == false && res.error.status == 401) {
        let auth = await this.auth();
        config.headers["access_token"] = auth.token;
        let res = await new NetworkInterceptor(config).methodInvocation();
        return res;
      } else return res;
    } catch (e) {
      if (e.response.status == 401) {
        let auth = await this.auth();
        config.headers["access_token"] = auth.token;
        let res = await new NetworkInterceptor(config).methodInvocation();
        return res;
      } else {
        throw e;
      }
    }
  }

  async getUserInfo() {
    return this.request({
      url: `${baseUrl}me`,
      method: "GET"
    });
  }
}

module.exports = new Test();
