"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const trip_schema_1 = require("./schemas/trip.schema");
const trips_service_1 = require("./trips.service");
const trips_controller_1 = require("./trips.controller");
const google_user_module_1 = require("../google-user/google-user.module");
let TripsModule = class TripsModule {
};
exports.TripsModule = TripsModule;
exports.TripsModule = TripsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: trip_schema_1.Trip.name, schema: trip_schema_1.TripSchema }]),
            google_user_module_1.GoogleUserModule,
        ],
        controllers: [trips_controller_1.TripsController],
        providers: [trips_service_1.TripsService],
    })
], TripsModule);
//# sourceMappingURL=trips.module.js.map