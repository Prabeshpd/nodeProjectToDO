const { ERR } = require("./error");

const generateRandomPassword = length => {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#!$%^&*()+-";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
};

module.exports = { generateRandomPassword, ERR };
