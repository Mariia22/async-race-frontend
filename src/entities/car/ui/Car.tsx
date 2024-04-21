import { useCallback, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import CarDeleteButton from '../../../features/car-delete/ui/CarDeleteButton';
import CarSelectButton from '../../../features/car-select/ui/CarSelectButton';
import { CarItemType } from '../model/types';
import { startAnimation, stopAnimation } from '../lib/animation';
import { carApi } from '../api/carApi';
import CarIcon from '../assets/car.svg?react';
import { StatusCode } from '../../../shared/lib/types';
import Button from '../../../shared/ui/Button/Button';

function Car({ id, name, color }: CarItemType) {
  const [startEngine] = carApi.useStartEngineMutation();
  const [driveEngine] = carApi.useDriveEngineMutation();
  const [stopEngine] = carApi.useStopEngineMutation();
  const [translate, setTranslate] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const startEngineHandler = useCallback(() => {
    setIsDisabled(true);
    startEngine(id)
      .unwrap()
      .then((startMode) => {
        startAnimation(id, Math.min(startMode.distance / startMode.velocity), setTranslate);
      });
    driveEngine(id)
      .unwrap()
      .then()
      .catch((error: FetchBaseQueryError) => {
        console.log(error);
        if (
          error
          && 'originalStatus' in error
          && error.originalStatus === StatusCode.InternalServerError
        ) {
          stopAnimation(id);
        }
      })
      .finally(() => setIsDisabled(false));
  }, [startEngine, driveEngine, id]);

  const stopEngineHandler = useCallback(() => {
    setIsDisabled(false);
    stopEngine(id)
      .unwrap()
      .then(() => stopAnimation(id))
      .then(() => setTranslate(0))
      .then(() => setIsDisabled(false))
      .catch((error) => console.log(error));
  }, [stopEngine, id, isDisabled]);

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
