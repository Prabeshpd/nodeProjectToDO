const mongoose = require("mongoose");
const userController = require("../modules/users/user.controller");

mongoose.connect("mongodb://localhost:27017/demo", { useNewUrlParser: true });

const setup = {
  initalize: async () => {
    let user = await userController.add({
      name: "Prabesh",
      email: "prabesh1995nepalktm@gmail.com",
      username: "prqbesh1995",
      password: "t$mp1234",
      phone: "98323233"
    });
  }
};

setup.initalize();
