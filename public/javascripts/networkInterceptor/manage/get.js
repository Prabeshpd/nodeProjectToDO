class Get extends Base {
  process() {
    return new Promise((resolve, reject) => {
      console.log("request is being generated");
      this.xhr.open(this.method, this.url, true);
      this.setHeader();
      this.xhr.send();
      let response = null;
      let error = null;
      console.log("request is send");
      this.xhr.onload = () => {
        if (this.xhr.status != 200) {
          response = jsontoData(this.xhr.response);
          if (this.onError) this.callBackExecution({ error: this.xhr.response, response: null });
          response.error.status
            ? (error = response.error.status + " " + response.message)
            : (error = response.error);
          console.log(error);
          reject(error);
        }

        if (this.xhr.status === 200 && this.xhr.readyState === 4) {
          response = jsontoData(this.xhr.response);
          if (this.onSuccess) this.callBackExecution({ error: null, response: response });
          console.log(response);
          resolve(response);
        }
      };
    });
  }
}
