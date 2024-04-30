export type WinnerDTO = {
  id: number;
  wins: number;
  time: number;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
  name?: string;
  color?: string;
};

export type WinnerType = {
  currentWinnerPage: number;
  sortAndOrder: SortOrderType;
};

export enum Sort {
  wins = 'wins',
  time = 'time',
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortOrderType = {
  sort: Sort | null;
  order: Order | null;
};
