import { CarItemType } from '../../car/model/types';

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

export type RaceWinner = {
  id: number;
  success?: boolean | undefined;
  velocity?: number | undefined;
  distance?: number | undefined;
};

export type RaceResult = {
  winnerCar: CarItemType;
  time: number;
};
