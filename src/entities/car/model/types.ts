export type CarItemType = {
  id: number;
  name: string;
  color: string;
};

export type CarsType = {
  activeCar: CarItemType;
};

export enum EngineStatus {
  start = 'started',
  stop = 'stopped',
  drive = 'drive',
}

export type EngineDrive = {
  success: boolean;
};

export type EngineResponse = {
  velocity: number;
  distance: number;
};

export type AnimationType = {
  id: number;
  animation: number;
};
