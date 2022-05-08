import { Router } from "express";
import { transportController } from "./transport.controllers";
import { transportValidations } from "./transport.validations";

const router = Router();

router.get("/", transportController.getListTransports);

router.get("/:transportId", transportController.geTransportById);

router.post(
  "/",
  transportValidations.validateCreateTransport,
  transportController.createTransport
);

router.put(
  "/:transportId",
  transportValidations.validateUpdateTransport,
  transportController.updateTransport
);

router.delete("/:transportId", transportController.deleteTransport);

export const transportRouter = router;
