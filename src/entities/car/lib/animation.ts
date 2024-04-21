import { Dispatch, SetStateAction } from 'react';
import { distanceAfterFlag } from '../../../shared/lib/const';

let animationState: { id: number; animation: number }[] = [];

export function getPosition(element: HTMLElement): number {
  const { left, width } = element.getBoundingClientRect();
  return left + width / 2;
}

export function getDistance(firstElement: HTMLElement, secondElement: HTMLElement): number {
  return Math.hypot(getPosition(firstElement) - getPosition(secondElement)) + distanceAfterFlag;
}

function cancelAnimation(id: number) {
  const el = animationState.filter((item) => item.id === id)[0];
  window.cancelAnimationFrame(el.animation);
}

export const startAnimation = (
  id: number,
  time: number,
  callback: Dispatch<SetStateAction<number>>,
) => {
  const screenDistance = 500;
  let start: null | number = null;

  const move = (timestamp: number): void => {
    if (!start) start = timestamp;
    const progress: number = timestamp - start;
    const passed: number = Math.round(progress * (screenDistance / time));
    callback(Math.min(screenDistance, passed));
    if (passed < screenDistance) {
      animationState = [
        ...animationState.map((item) => {
          if (item.id === id) {
            item.animation = window.requestAnimationFrame(move);
          }
          return item;
        }),
      ];
    }
  };
  animationState.push({ id, animation: window.requestAnimationFrame(move) });
};

export function stopAnimation(id: number) {
  cancelAnimation(id);
  animationState = [...animationState.filter((item) => item.id !== id)];
}
