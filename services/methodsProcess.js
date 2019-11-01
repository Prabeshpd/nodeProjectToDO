const http = require("http");

const get = {
  process: ({ method, headers, url, port, dataType, timeOut }) => {
    let options = { method, headers };
    let output = "";
    return new Promise((resolve, reject) => {
      let response = http.request(url, options, res => {
        res.setEncoding("utf8");
        res.on("data", d => {
          output += d;
        });

        res.on("end", () => {
          console.log(output);
          let obj = JSON.parse(output);
          console.log(obj);
          resolve(obj);
        });
      });

      response.on("error", error => {
        console.error(error);
        reject(error);
      });

      response.end();
    });
  }
};

const post = {
  process: ({ method, headers, url, port, data, dataType, timeOut }) => {
    let options = { method, headers };
    let output = "";
    data = JSON.stringify(data);

    return new Promise((resolve, reject) => {
      let response = http.request(url, options, res => {
        res.setEncoding("utf8");
        res.on("data", d => {
          output += d;
        });

        res.on("end", () => {
          let obj = JSON.parse(output);

          resolve(obj);
          console.log(obj);
        });
      });

      response.on("error", error => {
        console.error(error);
        reject(error);
      });

      response.write(data);
      response.end();
    });
  }
};

module.exports = { get, post };
