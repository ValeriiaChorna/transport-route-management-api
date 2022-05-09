# transport-route-management-api

## Transport
GET `/transports` - get transport list

GET `/transports?status=free` - get transport list with status='free'

POST `/transports` - create new transport

GET `/transports/:transportId` - get transport with id='transportId'

PUT `/transports/:transportId` - update fields of transport with id='transportId'

DELETE `/transports/:transportId` - delete transport with id='transportId'

###Model

```
{
  licensePlate: {
    type: String,
    require: true,
    unique: true,
    maxlength: 8,
    minlength: 4,
  },
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
    validate: "An event must be at least "1980-01-01" and not more than today.",
    format: "YYYY-MM-DD"
  },
  mileage: { type: Number, require: false, min: 0, max: 5000000 },
  status: {
    type: String,
    require: true,
    default: TRANSPORT_STATUS_OPTIONS.FREE,
    enum: Object.values(TRANSPORT_STATUS_OPTIONS),
  },
}
```

## Routes

GET `/routes` - get routes list

GET `/routes?status=pending` - get routes list with status='pending'

POST `/routes` - create new route

GET `/routes/:routeId` - get route with id='routeId'

PUT `/routes/:routeId` - update fields of route with id='routeId'. To assign transport to the route: `req.body = { transportId: transportId}`

DELETE `/routes/:routeId` - delete route with id='routeId'

###Model

```
{
  startCity: { type: String, require: true, maxlength: 15, minlength: 3 },
  targetCity: { type: String, require: true, maxlength: 15, minlength: 3 },
  distance: { type: Number, require: true, maxlength: 10000, minlength: 0 },
  dispatchDate: {
    type: Date,
    require: true,
    validate: "An event must be at least 1 day from now and not more than 90 days.",
    format: "YYYY-MM-DD"
  },
  neededTransportType: {
    type: String,
    require: true,
    default: TRANSPORT_TYPES_OPTIONS.TRUCK,
    enum: Object.values(TRANSPORT_TYPES_OPTIONS),
  },
  revenueUSD: { type: Number, require: true, maxlength: 10000, minlength: 0 },
  transportId: { type: Schema.Types.ObjectId, default: null, require: true },
  status: {
    type: String,
    require: true,
    default: ROUTES_STATUS_OPTIONS.PENDING,
    enum: Object.values(ROUTES_STATUS_OPTIONS),
  },
  executionDate: {
    type: Date,
    default: null,
    validate: "An event must be at least 1 day from now and not more than 90 days.",
    format: "YYYY-MM-DD"
  },
}
```