class NetworkInterceptor {
  constructor({ method, url, onSuccess, onError, headers, data, dataType, formId, timeOut }) {
    this.method = method.toUpperCase() || "GET";
    this.url = url;
    this.onSuccess = onSuccess || null;
    this.onError = onError || null;
    this.headers = headers || null;
    this.data = data || null;
    this.dataType = dataType || "application/json";
    this.formId = formId;
    this.dataTypesConversion = {
      json: dataToJson(this.data)
    };
    this.timeOut = timeOut || 250000;
    this.xhr = null;
  }

  verifyMethod() {
    if (!this.isMethodVerified()) handleError("Data must be send for the required method");
  }

  setHeader() {
    let customHeaders = {};
    let typeOfData = this.dataType.split("/");
    if (typeOfData[1] === "json") customHeaders["Content-Type"] = "application/json";
    else customHeaders["Content-Type"] = this.dataType;
    this.headers = Object.assign({}, this.headers, customHeaders);
    this.dataType = typeOfData[1];
  }

  isMethodVerified() {
    switch (this.method) {
      case "POST":
      case "PUT":
        return this.data ? true : false;
      default:
        return true;
    }
  }

  processDataFormat() {
    this.data = this.dataTypesConversion[this.dataType];
  }

  async createRequest() {
    try {
      this.verifyMethod();
      this.setHeader();
      this.processDataFormat();
      this.xhr = new XMLHttpRequest();
      this.xhr.withCredentials = true;

      this.xhr.timeout = this.timeOut;

      let httpMethod = methodsInvocation({
        method: this.method,
        url: this.url,
        onSuccess: this.onSuccess,
        onError: this.onError,
        xhr: this.xhr,
        data: this.data,
        headers: this.headers
      });

      return await httpMethod.process();
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
