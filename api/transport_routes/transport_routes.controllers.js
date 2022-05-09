import { RouteModel } from "./transport_routes.model";
import {
  NotFound,
  DeletedSuccess,
  ValidationError,
} from "../helpers/errorConstructors";
import createControllerProxy from "../helpers/createControllerProxy";
import { TRANSPORT_STATUS_OPTIONS } from "../constants";
import { TransportModel } from "../transport/transport.model";

class RouteController {
  async getRouteByIdOrThrow(routeId) {
    const foundedRoute = await RouteModel.getRouteById(routeId);
    if (!foundedRoute) {
      throw new NotFound("Route not found");
    }
    return foundedRoute;
  }

  async getListRoutes(req, res, next) {
    try {
      const { status, page, limit, sort } = req.query;
      let routesList;
      const options = limit && { page, limit, sort };
      const filter = {};
      if (status) {
        filter.status = status;
      }
      routesList = await RouteModel.paginate(filter, options);
      return res.status(200).json(routesList.docs);
    } catch (err) {
      next(err);
    }
  }

  async getRouteById(req, res, next) {
    try {
      const { routeId } = req.params;
      const foundedRoute = await this.getRouteByIdOrThrow(routeId);
      return res.status(200).json(foundedRoute);
    } catch (err) {
      next(err);
    }
  }

  async createRoute(req, res, next) {
    try {
      const newRoute = await RouteModel.createRoute({
        ...req.body,
      });
      return res.status(201).json({ ...newRoute._doc });
    } catch (err) {
      next(err);
    }
  }

  async deleteRoute(req, res, next) {
    try {
      const { routeId } = req.params;
      await this.getRouteByIdOrThrow(routeId);
      await RouteModel.removeRoute(routeId);
      throw new DeletedSuccess("Route deleted");
    } catch (err) {
      next(err);
    }
  }

  async updateRoute(req, res, next) {
    try {
      const { routeId } = req.params;
      const { transportId } = req.body;
      const foundedRoute = await this.getRouteByIdOrThrow(routeId);
      if (transportId) {
        const foundedTransport = await TransportModel.getTransportById(
          transportId
        );
        if (!foundedTransport) {
          throw new ValidationError("Transport not found");
        }
        if (foundedTransport.status === TRANSPORT_STATUS_OPTIONS.BUSY) {
          throw new ValidationError(`Transport ${transportId} is busy`);
        }
        if (
          foundedTransport.transportType !== foundedRoute.neededTransportType
        ) {
          throw new ValidationError(
            `Type of transport ${transportId} is ${foundedTransport.transportType}, neededTransportType is ${foundedRoute.neededTransportType}`
          );
        }
        await TransportModel.updateTransport(transportId, {
          status: TRANSPORT_STATUS_OPTIONS.BUSY,
        });
      }
      const updatedRoute = await RouteModel.updateRoute(routeId, req.body);

      return res.status(200).json({ ...updatedRoute._doc });
    } catch (err) {
      next(err);
    }
  }
}

export const routeController = createControllerProxy(new RouteController());
