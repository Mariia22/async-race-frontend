import { CarItemType } from '../../car/model/types';

export type AnimationType = {
  id: number;
  coordinate: number;
  isDriving: boolean;
  isStop: boolean;
  animation: number;
};

export type RaceType = {
  carsInRace: CarItemType[];
  animationStack: AnimationType[];
};
