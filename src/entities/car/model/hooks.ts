import { useAppDispatch, useAppSelector } from '../../../shared/model/hooks';
import {
  getAllDrivingCars,
  refreshAnimation,
  refreshCoordinate,
  setAnimationStack,
  stopCar,
} from '../../race/model/raceSlice';

const useAnimation = () => {
  const animationState = useAppSelector(getAllDrivingCars);
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
    const el = animationState.find((item) => item.id === id);
    if (el) {
      window.cancelAnimationFrame(el.animation);
    }
    dispatch(stopCar(id));
  };

  const brokeCar = (id: number) => {
    console.log('broke');
    const el = animationState.find((item) => item.id === id);
    if (el) {
      window.cancelAnimationFrame(el.animation);
    }
  };

  return { startAnimation, cancelAnimation, brokeCar };
};

export default useAnimation;
