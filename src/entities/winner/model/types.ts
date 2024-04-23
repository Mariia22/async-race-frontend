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