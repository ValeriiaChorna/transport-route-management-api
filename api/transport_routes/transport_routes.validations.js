import { ValidationError } from "../helpers/errorConstructors";
import Joi from "joi";
import { ROUTES_STATUS_OPTIONS, TRANSPORT_TYPES_OPTIONS } from "../constants";
Joi.objectId = require("joi-objectid")(Joi);

class RouteValidations {
  validateCreateRoute(req, res, next) {
    const routeRules = Joi.object({
      startCity: Joi.string().min(3).max(15).required(),
      targetCity: Joi.string().min(3).max(15).required(),
      distance: Joi.number().min(0).max(10000).required(),
      dispatchDate: Joi.date(),
      neededTransportType: Joi.string().required(),
      revenueUSD: Joi.number().min(0).max(10000).required(),
      transportId: Joi.objectId(),
      status: Joi.string(),
      executionDate: Joi.date(),
    }).keys({
      neededTransportType: Joi.string().valid(
        ...Object.values(TRANSPORT_TYPES_OPTIONS)
      ),
      status: Joi.string().valid(...Object.values(ROUTES_STATUS_OPTIONS)),
      executionDate: Joi.date().greater(Joi.ref("dispatchDate")),
    });
    const validationResult = routeRules.validate(req.body);
    if (validationResult.error) {
      throw new ValidationError(validationResult.error);
    }
    next();
  }

  validateUpdateRoute(req, res, next) {
    if (!Object.keys(req.body).length) {
      throw new ValidationError("Nothing to update");
    }
    const routeRules = Joi.object({
      startCity: Joi.string().min(3).max(15),
      targetCity: Joi.string().min(3).max(15),
      distance: Joi.number().min(0).max(10000),
      dispatchDate: Joi.date(),
      neededTransportType: Joi.string(),
      revenueUSD: Joi.number().min(0).max(10000),
      transportId: Joi.objectId(),
      status: Joi.string(),
      executionDate: Joi.date(),
    }).keys({
      neededTransportType: Joi.string().valid(
        ...Object.values(TRANSPORT_TYPES_OPTIONS)
      ),
      status: Joi.string().valid(...Object.values(ROUTES_STATUS_OPTIONS)),
    });
    const validationResult = routeRules.validate(req.body);
    if (validationResult.error) {
      throw new ValidationError(validationResult.error);
    }
    next();
  }
}

export const routeValidations = new RouteValidations();
