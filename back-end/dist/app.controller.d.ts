import { MessageEvent } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { Racer, Winner } from './racerTypes';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getRacers(): Racer[];
    start(): Observable<MessageEvent>;
    getWinner(raceId: string): Winner;
    getWinners(): Winner[];
}
