import mongoose, { Schema } from "mongoose";
import { ROUTES_STATUS_OPTIONS, TRANSPORT_TYPES_OPTIONS } from "../constants";
const mongoosePaginate = require("mongoose-paginate-v2");
const { ObjectId } = mongoose.Types;

const routeSchema = new Schema({
  startCity: { type: String, require: true, maxlength: 15, minlength: 3 },
  targetCity: { type: String, require: true, maxlength: 15, minlength: 3 },
  distance: { type: Number, require: true, maxlength: 10000, minlength: 0 },
  dispatchDate: {
    type: Date,
    require: true,
    validate: {
      validator: function (v) {
        return (
          v && // check that there is a date object
          v.getTime() > Date.now() - 24 * 60 * 60 * 1000 &&
          v.getTime() < Date.now() + 90 * 24 * 60 * 60 * 1000
        );
      },
      message:
        "An event must be at least 1 day from now and not more than 90 days.",
    },
  },
  neededTransportType: {
    type: String,
    require: true,
    default: TRANSPORT_TYPES_OPTIONS.TRUCK,
    enum: Object.values(TRANSPORT_TYPES_OPTIONS),
  },
  revenueUSD: { type: Number, require: true, maxlength: 10000, minlength: 0 },
  transportId: { type: Schema.Types.ObjectId, require: true },
  status: {
    type: String,
    require: true,
    default: ROUTES_STATUS_OPTIONS.PENDING,
    enum: Object.values(ROUTES_STATUS_OPTIONS),
  },
  executionDate: {
    type: Date,
    require: true,
    validate: {
      validator: function (v) {
        return (
          v && // check that there is a date object
          v.getTime() > Date.now() - 24 * 60 * 60 * 1000 &&
          v.getTime() < Date.now() + 90 * 24 * 60 * 60 * 1000
        );
      },
      message:
        "An event must be at least 1 day from now and not more than 90 days.",
    },
  },
});

export const routeModel = mongoose.model("Route", routeSchema);
