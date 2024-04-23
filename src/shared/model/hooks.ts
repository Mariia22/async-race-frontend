import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/appStore';
import {
  refreshAnimation,
  refreshCoordinate,
  setAnimationStack,
  stopCar,
  brokeCar,
} from '../../entities/race/model/raceSlice';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAnimation = () => {
  const dispatch = useAppDispatch();

  const startAnimation = (id: number, time: number, screenWidth: number): void => {
    let start: null | number = null;

    const move = (timestamp: number): void => {
      if (!start) start = timestamp;
      const progress: number = timestamp - start;
      const passed: number = Math.round(progress * (screenWidth / time));
      dispatch(refreshCoordinate({ id, coordinate: Math.min(screenWidth, passed) }));
      if (passed < screenWidth) {
        dispatch(
          refreshAnimation({
            id,
            animation: window.requestAnimationFrame(move),
          }),
        );
      }
    };
    dispatch(
      setAnimationStack({
        id,
        animation: window.requestAnimationFrame(move),
        coordinate: 0,
        isDriving: true,
        isStop: false,
      }),
    );
  };

  const cancelAnimation = (id: number) => {
    dispatch(brokeCar(id));
  };

  const stopAnimationAndReturnToStart = (id: number) => {
    cancelAnimation(id);
    dispatch(stopCar(id));
  };

  return { startAnimation, cancelAnimation, stopAnimationAndReturnToStart };
};
