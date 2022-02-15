import { Racer, RacerPosition, Winner } from './racerTypes';
import { Observable } from 'rxjs';
export declare class AppService {
    private positions;
    private static readonly racers;
    getRacers(): Racer[];
    race(): Observable<{
        raceId: string;
        racerPosition: RacerPosition[];
    }>;
    getWinner(raceId: string): Winner;
    getWinners(): Winner[];
}
