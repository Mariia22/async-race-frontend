import { useCallback, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import CarIcon from '../assets/car.svg?react';
import Button from '../../../shared/ui/Button/Button';
import CarDeleteButton from '../../../features/car-delete/ui/CarDeleteButton';
import CarSelectButton from '../../../features/car-select/ui/CarSelectButton';
import { CarItemType } from '../model/types';
import { carApi } from '../api/carApi';
import { screenDistance } from '../../../shared/lib/const';
import { StatusCode } from '../../../shared/lib/types';
import useAnimation from '../model/hooks';

function Car({ id, name, color }: CarItemType) {
  const [startEngine] = carApi.useStartEngineMutation();
  const [driveEngine] = carApi.useDriveEngineMutation();
  const [stopEngine] = carApi.useStopEngineMutation();
  const [translate, setTranslate] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { startAnimation, cancelAnimation } = useAnimation();

  const startEngineHandler = useCallback(() => {
    setIsDisabled(true);
    startEngine(id)
      .unwrap()
      .then((startMode) => {
        startAnimation(
          id,
          Math.min(startMode.distance / startMode.velocity),
          setTranslate,
          screenDistance,
        );
      });
    driveEngine(id)
      .unwrap()
      .then()
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
      })
      .finally(() => setIsDisabled(false));
  }, [startEngine, driveEngine, id, cancelAnimation, startAnimation]);

  const stopEngineHandler = useCallback(() => {
    setIsDisabled(false);
    stopEngine(id)
      .unwrap()
      .then(() => cancelAnimation(id))
      .then(() => setTranslate(0))
      .then(() => setIsDisabled(false))
      .catch((error) => console.log(error));
  }, [stopEngine, id, cancelAnimation]);

  return (
    <>
      <div>
        <CarSelectButton id={id} name={name} color={color} />
        <CarDeleteButton id={id} />
      </div>
      <div>
        <Button name="Start" disabled={isDisabled} onClick={startEngineHandler} />
        <Button name="Stop" disabled={!isDisabled} onClick={stopEngineHandler} />
      </div>
      <div style={{ transform: `translateX(${translate}px)` }}>
        <CarIcon fill={color} />
      </div>
      <p>{name}</p>
    </>
  );
}
export default Car;
