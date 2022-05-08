import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

async function getAllRoutes() {
  return this.find();
}

async function getRouteByStatus(status) {
  return this.find({ status });
}

async function getRouteById(routeId) {
  if (!ObjectId.isValid(routeId)) {
    return null;
  }

  return this.findById(routeId);
}

async function createRoute(newRouteParams) {
  return this.create(newRouteParams);
}

async function removeRoute(routeId) {
  if (!ObjectId.isValid(routeId)) {
    return null;
  }

  return this.findByIdAndDelete(routeId);
}

async function updateRoute(routeId, newRouteParams) {
  if (!ObjectId.isValid(routeId)) {
    return null;
  }

  return this.findByIdAndUpdate(
    routeId,
    { $set: newRouteParams },
    { new: true }
  );
}

export default {
  getAllRoutes,
  getRouteByStatus,
  getRouteById,
  createRoute,
  removeRoute,
  updateRoute,
};
