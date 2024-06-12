const router = require("express").Router();

const apiRouter = require("./api/api");
const pagesRouter = require("./pages/pages");

router.use("/api", apiRouter);
router.use("/", pagesRouter);

// When not found, send 404
router.use("/", (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
