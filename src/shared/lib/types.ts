export type RouteType = {
  key: number;
  link: string;
  name: string;
};

export const CAR_TAG = 'CAR_TAG';
export const WINNER_TAG = 'WINNER_TAG';

export enum StatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  TooManyRequests = 429,
  InternalServerError = 500,
}
