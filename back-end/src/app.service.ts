import { Injectable } from '@nestjs/common';
import { RacePositions, Racer, RacerPosition, Winner } from './racerTypes';
import { interval, Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  private positions: RacePositions[] = [];

  private static readonly racers: Racer[] = [
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

  /**
   * Get all racers
   */
  public getRacers(): Racer[] {
    return AppService.racers.map((racer) => {
      return {
        id: racer.id,
        name: racer.name,
        color: racer.color,
      };
    });
  }

  /**
   * Start a race
   */
  public race(): Observable<{
    raceId: string;
    racerPosition: RacerPosition[];
  }> {
    const raceId = uuid();
    AppService.racers.forEach((racer) => {
      racer.speed = Math.random() + 4;
    });

    return interval(1000).pipe(
      takeWhile((value: number) => {
        const filter = AppService.racers.filter((ar) => ar.speed * value > 103);

        return filter.length === 0;
      }),
      map((timeElapsed) => {
        const positions = AppService.racers.map((ar) => {
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
      }),
    );
  }

  /**
   * Get the winner of a specific race
   *
   * @param raceId
   */
  public getWinner(raceId: string): Winner {
    const racePositions = this.positions.filter(
      (races) => races.raceId === raceId,
    );

    const winner = _.last(racePositions).racerPositions.reduce((a, b) =>
      a.position > b.position ? a : b,
    );

    const racer = AppService.racers.find((racer) => racer.id === winner.racerId);

    return {
      raceId: raceId,
      racer: {
        id: racer.id,
        name: racer.name,
      },
    };
  }

  /**
   * Get the winner for each race
   */
  public getWinners(): Winner[] {
    const raceIds = _.uniq(this.positions.map((position) => position.raceId));

    return raceIds.map((raceId) => this.getWinner(raceId));
  }
}
