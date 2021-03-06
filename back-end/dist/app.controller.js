"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const _ = require("lodash");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getRacers() {
        return this.appService.getRacers();
    }
    start() {
        return this.appService.race().pipe(operators_1.map((vehiclePositions) => ({
            data: vehiclePositions,
        })));
    }
    getWinner(raceId) {
        if (_.isEmpty(raceId)) {
            throw new common_1.HttpException('RaceId cannot be empty', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.appService.getWinner(raceId);
    }
    getWinners() {
        return this.appService.getWinners();
    }
};
__decorate([
    common_1.Get('/racers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], AppController.prototype, "getRacers", null);
__decorate([
    common_1.Sse('/race/start'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], AppController.prototype, "start", null);
__decorate([
    common_1.Get('/race/:raceId/winner'),
    __param(0, common_1.Param('raceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AppController.prototype, "getWinner", null);
__decorate([
    common_1.Get('/winners'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], AppController.prototype, "getWinners", null);
AppController = __decorate([
    common_1.Controller('/api'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map