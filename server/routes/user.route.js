const express = require("express");
const { route } = require(".");
const router = express.Router();
const controller = require("../controllers/user.controller");

route.post("/join", controller.user_join_post);
route.post("/login", controller.user_login_post);
route.post("/transfer", controller.user_transfer_post);

module.exports = router