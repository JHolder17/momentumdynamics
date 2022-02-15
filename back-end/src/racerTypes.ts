export type Racer = {
  id: string;
  name: string;
  color: 'red' | 'white' | 'black';
  speed?: number
};

export type RacerPosition = {
  racerId: string;
  position: number;
};

export type RacePositions = {
  raceId: string;
  racerPositions: RacerPosition[];
};

export type Winner = {
  raceId: string;
  racer: Partial<Racer>;
};
