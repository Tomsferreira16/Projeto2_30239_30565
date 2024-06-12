const router = require("express").Router();

const { login, register, logout } = require("../../../controllers/auth");
const authMiddleware = require("../../../middleware/auth");
const noAuthMiddleware = require("../../../middleware/no_auth");

router.post("/login", noAuthMiddleware, login);
router.post("/register", noAuthMiddleware, register);
router.post("/logout", authMiddleware, logout);

module.exports = router;
