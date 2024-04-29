import { RouteType } from './types';

export const routes: RouteType[] = [
  {
    key: 0,
    link: '/',
    name: 'Garage',
  },
  {
    key: 1,
    link: '/winners',
    name: 'Winners',
  },
];

export const dots = '...';
export const baseUrl = 'http://127.0.0.1:3000';
export const limitCarsPerPage = 7;
export const limitWinnersPerPage = 10;
export const initialColor = '#ffffff';
export const distanceAfterFlag = 100;
export const distanceBeforeStart = 100;
export const messages = {
  raceError: 'The race ended without winners',
  carEnterError: "Enter the car's name more than 3 characters long",
};
