const router = require("express").Router();
const acessoriosController = require("../../../controllers/acessorios");
const authMiddleware = require("../../../middleware/auth");
const adminMiddleware = require("../../../middleware/admin");

router.get("/", acessoriosController.getAcessorios);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  acessoriosController.createAcessorio
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  acessoriosController.updateAcessorio
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  acessoriosController.deleteAcessorio
);

module.exports = router;
