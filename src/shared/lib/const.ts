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
