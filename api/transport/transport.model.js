import mongoose, { Schema } from "mongoose";
import {
  TRANSPORT_STATUS_OPTIONS,
  TRANSPORT_TYPES_OPTIONS,
} from "../constants";
import transportFunctions from "./transport.functions";
const mongoosePaginate = require("mongoose-paginate-v2");

const transportSchema = new Schema({
  licensePlate: { type: String, require: true, maxlength: 8, minlength: 4 },
  transportModel: { type: String, require: true, maxlength: 20, minlength: 3 },
  transportType: {
    type: String,
    require: true,
    default: TRANSPORT_TYPES_OPTIONS.TRUCK,
    enum: Object.values(TRANSPORT_TYPES_OPTIONS),
  },
  purchaseDate: {
    type: Date,
    require: false,
    // min: "1980-01-01",
    // max: Date.now(),
    validate: {
      validator: function (v) {
        return (
          v && // check that there is a date object
          v.getTime() > new Date("1980-01-01") &&
          v.getTime() <= Date.now()
        );
      },
      message:
        "An event must be at least 1 day from now and not more than today.",
    },
  },
  mileage: { type: Number, require: false, min: 0, max: 5000000 },
  status: {
    type: String,
    require: true,
    default: TRANSPORT_STATUS_OPTIONS.FREE,
    enum: Object.values(TRANSPORT_STATUS_OPTIONS),
  },
});

transportSchema.statics.getAllTransports = transportFunctions.getAllTransports;
transportSchema.statics.getTransportsByStatus =
  transportFunctions.getTransportsByStatus;
transportSchema.statics.getTransportById = transportFunctions.getTransportById;
transportSchema.statics.createNewTransport =
  transportFunctions.createNewTransport;
transportSchema.statics.removeTransport = transportFunctions.removeTransport;
transportSchema.statics.updateExistedTransport =
  transportFunctions.updateExistedTransport;

transportSchema.plugin(mongoosePaginate);

export const transportModel = mongoose.model("Transport", transportSchema);
