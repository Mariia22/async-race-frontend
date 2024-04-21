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
