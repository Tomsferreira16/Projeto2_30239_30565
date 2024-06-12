const router = require("express").Router();

router.get("/", (req, res) => {
  res.sendFile("home.html", { root: "pages" });
});
router.get("/acessorios", (req, res) => {
  res.sendFile("acessorios.html", { root: "pages" });
});
router.get("/cordas", (req, res) => {
  res.sendFile("cordas.html", { root: "pages" });
});
router.get("/instrumentos", (req, res) => {
  res.sendFile("instrumentos.html", { root: "pages" });
});
router.get("/perfil", (req, res) => {
  res.sendFile("perfil.html", { root: "pages" });
});

module.exports = router;
