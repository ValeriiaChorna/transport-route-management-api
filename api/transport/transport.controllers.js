import { TransportModel } from "./transport.model";
import { NotFound, DeletedSuccess } from "../helpers/errorConstructors";
import createControllerProxy from "../helpers/createControllerProxy";

class TransportController {
  async getTransportByIdOrThrow(transportId) {
    const foundedTransport = await TransportModel.getTransportById(transportId);
    if (!foundedTransport) {
      throw new NotFound("Transport not found");
    }
    return foundedTransport;
  }

  async getListTransports(req, res, next) {
    try {
      const { status, page, limit } = req.query;
      let transportsList;
      //TODO check
      const options = limit && { page, limit, sort: { createdAt: -1 } };
      const filter = {};
      if (status) {
        filter.status = status;
      }
      transportsList = await TransportModel.paginate(filter, options);
      return res.status(200).json(transportsList.docs);
    } catch (err) {
      next(err);
    }
  }

  async geTransportById(req, res, next) {
    try {
      const { transportId } = req.params;
      const foundedTransport = await this.getTransportByIdOrThrow(transportId);
      return res.status(200).json(foundedTransport);
    } catch (err) {
      next(err);
    }
  }

  async createTransport(req, res, next) {
    try {
      const newTransport = await TransportModel.createTransport({
        ...req.body,
      });
      return res.status(201).json({ ...newTransport });
    } catch (err) {
      next(err);
    }
  }

  async deleteTransport(req, res, next) {
    try {
      const { transportId } = req.params;
      await this.getTransportByIdOrThrow(transportId);
      await TransportModel.removeTransport(transportId);
      throw new DeletedSuccess("Transport deleted");
    } catch (err) {
      next(err);
    }
  }

  async updateTransport(req, res, next) {
    try {
      const { transportId } = req.params;
      await this.getTransportByIdOrThrow(transportId);
      const updatedTransport = await TransportModel.updateTransport(
        transportId,
        req.body
      );
      return res.status(200).json({ ...updatedTransport });
    } catch (err) {
      next(err);
    }
  }
}

export const transportController = createControllerProxy(
  new TransportController()
);
