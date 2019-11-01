var express = require("express");
var router = express.Router();

const { SecureUI, SecureAPI } = require("../utils/secureRoutes");
const UserController = require("../modules/users/user.controller");
const networkInterceptor = require("../services/networkInterceptor");
const Test = require("../services/nodeApp");

/* GET home page. */
router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login_process", async (req, res, next) => {
  try {
    let user = await UserController.login({
      username: req.body.username,
      password: req.body.password
    });
    let tokenData = await UserController.validateToken(user.token);
    res.cookie("access_token", user.token);
    res.cookie(
      "user",
      JSON.stringify({
        name: user.user.name,
        id: user.user.id
      })
    );
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.get("/me", SecureAPI(), (req, res, next) => {
  let user_id = req.tokenData.user_id;
  UserController.getById(user_id)
    .then(d => res.json(d))
    .catch(e => next(e));
});

router.get("/logout", function(req, res) {
  res.clearCookie("access_token");
  res.redirect("/login");
});

router.get("/", SecureUI(), (req, res, next) => {
  res.render("index");
});

router.get("/book", SecureAPI(), async (req, res, next) => {
  let response = await Test.getUserInfo();
  console.log("adfsdsf", response);
  res.json(response);
});

module.exports = router;
