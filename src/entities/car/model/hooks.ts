import { Dispatch, SetStateAction } from 'react';
import { AnimationType } from './types';

const useAnimation = () => {
  let animationState: AnimationType[] = [];

  const startAnimation = (
    id: number,
    time: number,
    callback: Dispatch<SetStateAction<number>>,
    screenWidth: number,
  ): void => {
    let start: null | number = null;

    const move = (timestamp: number): void => {
      if (!start) start = timestamp;
      const progress: number = timestamp - start;
      const passed: number = Math.round(progress * (screenWidth / time));
      callback(Math.min(screenWidth, passed));
      if (passed < screenWidth) {
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

  const cancelAnimation = (id: number) => {
    const el = animationState.find((item) => item.id === id);
    if (el) {
      window.cancelAnimationFrame(el.animation);
    }
    animationState = [...animationState.filter((item) => item.id !== id)];
  };

  return { startAnimation, cancelAnimation };
};

export default useAnimation;
