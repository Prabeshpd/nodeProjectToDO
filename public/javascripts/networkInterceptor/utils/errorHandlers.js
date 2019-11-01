class ErrorHandler extends Error {
  constructor(message, status, code) {
    super();
    this.message = message;
    this.data = {
      type: "Interceptor Error",
      message: message,
      name: code || "none",
      status: status || "none"
    };
    this.status = status || "none";
    // this.className = this.constructor.name;
    // console.log(message);

    this.stack = new Error(message).stack;
  }
}

const handleError = (message, status, code) => {
  throw new ErrorHandler(message, status, code);
};
