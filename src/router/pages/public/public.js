const noAuthenticationMiddleware = require("../../../middleware/no_auth");

const router = require("express").Router();

router.get("/", noAuthenticationMiddleware, (req, res) => {
  res.sendFile("main.html", { root: "pages" });
});
router.get("/index", noAuthenticationMiddleware, (req, res) => {
  res.sendFile("main.html", { root: "pages" });
});
router.get("/signup", noAuthenticationMiddleware, (req, res) => {
  res.sendFile("nova_conta.html", { root: "pages" });
});

module.exports = router;
