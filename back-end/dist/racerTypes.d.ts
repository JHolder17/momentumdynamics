export declare type Racer = {
    id: string;
    name: string;
    color: 'red' | 'white' | 'black';
    speed?: number;
};
export declare type RacerPosition = {
    racerId: string;
    position: number;
};
export declare type RacePositions = {
    raceId: string;
    racerPositions: RacerPosition[];
};
export declare type Winner = {
    raceId: string;
    racer: Partial<Racer>;
};
