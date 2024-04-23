export type AnimationType = {
  id: number;
  coordinate: number;
  isDriving: boolean;
  isStop: boolean;
  animation: number;
};

export type RaceType = {
  animationStack: AnimationType[];
};

export type RacePossibleWinner = {
  id: number;
  success?: boolean | undefined;
  velocity?: number | undefined;
  distance?: number | undefined;
};
