import { Router } from "express";
import { routeController } from "./transport_routes.controllers";
import { routeValidations } from "./transport_routes.validations";

const router = Router();

router.get("/", routeController.getListRoutes);

router.get("/:routeId", routeController.getRouteById);

router.post(
  "/",
  routeValidations.validateCreateRoute,
  routeController.createRoute
);

router.put(
  "/:routeId",
  routeValidations.validateUpdateRoute,
  routeController.updateRoute
);

router.delete("/:routeId", routeController.deleteRoute);

export const transportRouteRouter = router;
