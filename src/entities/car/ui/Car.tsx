import { useCallback } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import CarIcon from '../assets/car.svg?react';
import Button from '../../../shared/ui/Button/Button';
import CarDeleteButton from '../../../features/car-delete/ui/CarDeleteButton';
import CarSelectButton from '../../../features/car-select/ui/CarSelectButton';
import { CarItemType } from '../model/types';
import { carApi } from '../api/carApi';
import { screenDistance } from '../../../shared/lib/const';
import { StatusCode } from '../../../shared/lib/types';
import { useAnimation, useAppSelector } from '../../../shared/model/hooks';
import { selectCarById } from '../../race/model/raceSlice';
import { AnimationType } from '../../race/model/types';

function Car({ id, name, color }: CarItemType) {
  const [startEngine] = carApi.useStartEngineMutation();
  const [driveEngine] = carApi.useDriveEngineMutation();
  const [stopEngine] = carApi.useStopEngineMutation();
  const carInMotion: AnimationType = useAppSelector((state) => selectCarById(state, id));
  const { startAnimation, cancelAnimation, stopAnimationAndReturnToStart } = useAnimation();

  const startEngineHandler = useCallback(() => {
    startEngine(id)
      .unwrap()
      .then((startMode) => {
        startAnimation(id, Math.min(startMode.distance / startMode.velocity), screenDistance);
      })
      .then(() => driveEngine(id).unwrap())
      .catch((error: FetchBaseQueryError) => {
        if (
          error
          && 'originalStatus' in error
          && error.originalStatus === StatusCode.InternalServerError
        ) {
          cancelAnimation(id);
        } else {
          console.error(error);
        }
      });
  }, [startEngine, driveEngine, id, startAnimation, cancelAnimation]);

  const stopEngineHandler = useCallback(() => {
    stopEngine(id)
      .unwrap()
      .then(() => stopAnimationAndReturnToStart(id))
      .catch((error) => console.log(error));
  }, [stopEngine, id, stopAnimationAndReturnToStart]);

  return (
    <>
      <div>
        <CarSelectButton id={id} name={name} color={color} />
        <CarDeleteButton id={id} />
      </div>
      <div>
        <Button
          name="Start"
          disabled={carInMotion?.isDriving || false}
          onClick={startEngineHandler}
        />
        <Button name="Stop" disabled={carInMotion?.isStop || false} onClick={stopEngineHandler} />
      </div>
      <div style={{ transform: `translateX(${carInMotion?.coordinate || 0}px)` }}>
        <CarIcon fill={color} />
      </div>
      <p>{name}</p>
    </>
  );
}
export default Car;
