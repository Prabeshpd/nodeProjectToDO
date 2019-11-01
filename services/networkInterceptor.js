const { get, post } = require("./methodsProcess");
const methods = {
  GET: get,
  POST: post
};

class NetworkInterceptor {
  constructor({ method, data, headers, url, port, dataType, timeOut }) {
    this.method = method;
    this.data = data;
    this.headers = headers;
    this.url = url;
    this.port = port;
    this.dataType = dataType;
    this.timeOut = timeOut;
  }

  async methodInvocation() {
    try {
      let httpMethod = methods[this.method];
      return await httpMethod.process({
        method: this.method,
        headers: this.headers,
        url: this.url,
        port: this.url,
        data: this.data,
        dataType: this.dataType,
        timeOut: this.timeOut
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

module.exports = NetworkInterceptor;
