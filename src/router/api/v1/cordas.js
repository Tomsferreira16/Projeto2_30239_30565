const router = require("express").Router();
const cordasController = require("../../../controllers/cordas");
const authMiddleware = require("../../../middleware/auth");
const adminMiddleware = require("../../../middleware/admin");

router.get("/", cordasController.getCordas);
router.post("/", authMiddleware, adminMiddleware, cordasController.createCorda);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  cordasController.updateCorda
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  cordasController.deleteCorda
);

module.exports = router;
