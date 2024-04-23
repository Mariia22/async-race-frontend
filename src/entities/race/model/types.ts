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

export type RacePossibleWinner = {
  id: number;
  success?: boolean | undefined;
  velocity?: number | undefined;
  distance?: number | undefined;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
  name?: string;
  color?: string;
  car: CarItemType;
};
