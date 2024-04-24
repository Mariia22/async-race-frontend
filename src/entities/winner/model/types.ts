export type Winner = {
  id: number;
  wins: number;
  time: number;
  name?: string;
  color?: string;
};

export type WinnerType = {
  winners: Winner[];
};

export enum Sort {
  id = 'id',
  wins = 'wins',
  time = 'time',
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}
