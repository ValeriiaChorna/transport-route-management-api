import { RouteModel } from "./transport_routes.model";
import { NotFound, DeletedSuccess } from "../helpers/errorConstructors";
import createControllerProxy from "../helpers/createControllerProxy";

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
      //TODO check
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
      return res.status(201).json({ ...newRoute });
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
      await this.getRouteByIdOrThrow(routeId);
      const updatedRoute = await RouteModel.updateRoute(routeId, req.body);
      return res.status(200).json({ ...updatedRoute });
    } catch (err) {
      next(err);
    }
  }
}

export const routeController = createControllerProxy(new RouteController());
