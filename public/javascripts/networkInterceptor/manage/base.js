class Base {
  constructor({ method, url, onSuccess, onError, headers, data, xhr }) {
    this.method = method;
    this.url = url;
    this.onSuccess = onSuccess || null;
    this.onError = onError || null;
    this.userRequiredHeaders = headers || null;
    this.data = data;
    this.xhr = xhr;
    this.defaultHeaders = null;
    this.totalHeaders = Object.assign({}, this.defaultHeaders, this.userRequiredHeaders);
  }

  process() {
    console.log("afdsfdsfdsfdas");
  }

  setHeader() {
    setXhrHeader({ xhr: this.xhr, headers: this.totalHeaders });
  }

  callBackExecution({ error, response }) {
    return error ? this.onError(response) : this.onSuccess(response);
  }
}
