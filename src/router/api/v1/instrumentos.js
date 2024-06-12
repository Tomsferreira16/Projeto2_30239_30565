const router = require("express").Router();
const instrumentosController = require("../../../controllers/instrumentos");
const authMiddleware = require("../../../middleware/auth");
const adminMiddleware = require("../../../middleware/admin");

router.get("/", instrumentosController.getInstrumentos);
router.get("/:id", instrumentosController.getInstrumentoById);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  instrumentosController.createInstrumento
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  instrumentosController.updateInstrumento
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  instrumentosController.deleteInstrumento
);

module.exports = router;
