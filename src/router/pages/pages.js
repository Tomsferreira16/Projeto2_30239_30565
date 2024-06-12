const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth");
const noAuthenticationMiddleware = require("../../middleware/no_auth");

const publicRouter = require("./public/public");
const protectedRouter = require("./protected/protected");

router.use("/", publicRouter);
router.use("/pr", authMiddleware, protectedRouter);
router.use("/static", express.static("static"));

module.exports = router;
