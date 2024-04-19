import { CarItemType } from '../../../entities/car/model/types';
import { NUMBER_OF_CARS, carName, carSeria } from './const';

export function getRandomName(names: string[]): string {
  return names[Math.floor(Math.random() * names.length)];
}

export function getRandomColor(): string {
  const colorLetters = '0123456789abcdef';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += colorLetters[Math.floor(Math.random() * colorLetters.length)];
  }
  return color;
}

export function generateCars(): Partial<CarItemType>[] {
  const newCarsArray: Partial<CarItemType>[] = [];
  for (let i = 0; i < NUMBER_OF_CARS; i += 1) {
    newCarsArray.push({
      name: `${getRandomName(carName)} ${getRandomName(carSeria)}`,
      color: getRandomColor(),
    });
  }
  return newCarsArray;
}
