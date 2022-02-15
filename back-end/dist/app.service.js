"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const _ = require("lodash");
const uuid_1 = require("uuid");
let AppService = AppService_1 = class AppService {
    constructor() {
        this.positions = [];
    }
    getRacers() {
        return AppService_1.racers.map((racer) => {
            return {
                id: racer.id,
                name: racer.name,
                color: racer.color,
            };
        });
    }
    race() {
        const raceId = uuid_1.v4();
        AppService_1.racers.forEach((racer) => {
            racer.speed = Math.random() + 4;
        });
        return rxjs_1.interval(1000).pipe(operators_1.takeWhile((value) => {
            const filter = AppService_1.racers.filter((ar) => ar.speed * value > 103);
            return filter.length === 0;
        }), operators_1.map((timeElapsed) => {
            const positions = AppService_1.racers.map((ar) => {
                return {
                    racerId: ar.id,
                    position: timeElapsed * ar.speed,
                };
            });
            this.positions.push({ raceId: raceId, racerPositions: positions });
            return {
                raceId: raceId,
                racerPosition: positions,
            };
        }));
    }
    getWinner(raceId) {
        const racePositions = this.positions.filter((races) => races.raceId === raceId);
        const winner = _.last(racePositions).racerPositions.reduce((a, b) => a.position > b.position ? a : b);
        const racer = AppService_1.racers.find((racer) => racer.id === winner.racerId);
        return {
            raceId: raceId,
            racer: {
                id: racer.id,
                name: racer.name,
            },
        };
    }
    getWinners() {
        const raceIds = _.uniq(this.positions.map((position) => position.raceId));
        return raceIds.map((raceId) => this.getWinner(raceId));
    }
};
AppService.racers = [
    {
        id: 'mach5',
        name: 'Mach 5',
        color: 'white',
    },
    {
        id: 'snakeOiler',
        name: 'Snake Oiler',
        color: 'black',
    },
    {
        id: 'mach4',
        name: 'Mach 4',
        color: 'red',
    },
];
AppService = AppService_1 = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map