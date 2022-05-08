import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

async function getAllTransports() {
  return this.find();
}

async function getTransportsByStatus(status) {
  return this.find({ status });
}

async function getTransportById(transportId) {
  if (!ObjectId.isValid(transportId)) {
    return null;
  }

  return this.findById(transportId);
}

async function createNewTransport(newTransportParams) {
  return this.create(newTransportParams);
}

async function removeTransport(transportId) {
  if (!ObjectId.isValid(transportId)) {
    return null;
  }

  return this.findByIdAndDelete(transportId);
}

async function updateExistedTransport(transportId, newTransportParams) {
  if (!ObjectId.isValid(transportId)) {
    return null;
  }

  return this.findByIdAndUpdate(
    transportId,
    { $set: newTransportParams },
    { new: true }
  );
}

export default {
  getAllTransports,
  getTransportsByStatus,
  getTransportById,
  createNewTransport,
  removeTransport,
  updateExistedTransport,
};
