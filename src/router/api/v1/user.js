const router = require("express").Router();
const authenticationMiddleware = require("../../../middleware/auth");
const userRouter = require("../../../controllers/user");

router.get("/", authenticationMiddleware, userRouter.me);
router.put("/", authenticationMiddleware, userRouter.updateUser);

module.exports = router;
