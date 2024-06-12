const router = require("express").Router();

const authRouter = require("./v1/auth");
const userRouter = require("./v1/user");
const instrumentosRouter = require("./v1/instrumentos");
const cordasRouter = require("./v1/cordas");
const acessoriosRouter = require("./v1/acessorios");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/instrumentos", instrumentosRouter);
router.use("/cordas", cordasRouter);
router.use("/acessorios", acessoriosRouter);

module.exports = router;
