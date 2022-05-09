import Joi from "joi";
import { ValidationError } from "../helpers/errorConstructors";
import {
  TRANSPORT_STATUS_OPTIONS,
  TRANSPORT_TYPES_OPTIONS,
} from "../constants";

class TransportValidations {
  validateCreateTransport(req, res, next) {
    const transportRules = Joi.object({
      licensePlate: Joi.string().min(4).max(8).required(),
      transportModel: Joi.string().min(3).max(20).required(),
      transportType: Joi.string().required(),
      purchaseDate: Joi.date().min("1980-01-01"),
      mileage: Joi.number().min(3).max(5000000),
      status: Joi.string(),
    }).keys({
      transportType: Joi.string().valid(
        ...Object.values(TRANSPORT_TYPES_OPTIONS)
      ),
      status: Joi.string().valid(...Object.values(TRANSPORT_STATUS_OPTIONS)),
    });
    const validationResult = transportRules.validate(req.body);
    if (validationResult.error) {
      throw new ValidationError(validationResult.error);
    }
    next();
  }

  validateUpdateTransport(req, res, next) {
    if (!Object.keys(req.body).length) {
      throw new ValidationError("Nothing to update");
    }
    const transportRules = Joi.object({
      licensePlate: Joi.string().min(4).max(8),
      transportModel: Joi.string().min(3).max(20),
      transportType: Joi.string(),
      purchaseDate: Joi.date().min("1980-01-01"),
      mileage: Joi.number().min(3).max(5000000),
      status: Joi.string(),
    }).keys({
      transportType: Joi.string().valid(
        ...Object.values(TRANSPORT_TYPES_OPTIONS)
      ),
      status: Joi.string().valid(...Object.values(TRANSPORT_STATUS_OPTIONS)),
    });
    const validationResult = transportRules.validate(req.body);
    if (validationResult.error) {
      throw new ValidationError(validationResult.error);
    }
    next();
  }
}

export const transportValidations = new TransportValidations();
