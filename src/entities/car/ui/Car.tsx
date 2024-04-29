import { useCallback, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import CarIcon from '../assets/car.svg?react';
import Button from '../../../shared/ui/Button/Button';
import CarDeleteButton from '../../../features/car-delete/ui/CarDeleteButton';
import CarSelectButton from '../../../features/car-select/ui/CarSelectButton';
import { CarItemType } from '../model/types';
import { carApi } from '../api/carApi';
import { StatusCode } from '../../../shared/lib/types';
import { useAnimation, useAppSelector } from '../../../shared/model/hooks';
import { selectCarById } from '../../race/model/raceSlice';
import { AnimationType } from '../../race/model/types';
import styles from './style.module.scss';

type Props = {
  car: CarItemType;
  screenSize: number;
  totalCount: number;
};

function Car({ car, screenSize, totalCount }: Props) {
  const { id, name, color } = car;
  const [startEngine] = carApi.useStartEngineMutation();
  const [driveEngine] = carApi.useDriveEngineMutation();
  const [stopEngine] = carApi.useStopEngineMutation();
  const carInMotion: AnimationType = useAppSelector((state) => selectCarById(state, id));
  const { startAnimation, cancelAnimation, stopAnimationAndReturnToStart } = useAnimation();
  const [carError, setError] = useState<FetchBaseQueryError | null>(null);

  const startEngineHandler = useCallback(() => {
    startEngine(id)
      .unwrap()
      .then((startMode) => {
        startAnimation(id, Math.min(startMode.distance / startMode.velocity), screenSize);
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
          setError(error);
        }
      });
  }, [startEngine, driveEngine, id, startAnimation, cancelAnimation, screenSize]);

  const stopEngineHandler = useCallback(() => {
    stopEngine(id)
      .unwrap()
      .then(() => stopAnimationAndReturnToStart(id))
      .catch((error) => setError(error));
  }, [stopEngine, id, stopAnimationAndReturnToStart]);

  return (
    <section className={styles.car}>
      {carError && <p>{carError.status}</p>}
      <p className={styles.carName}>{name}</p>
      <div className={styles.carEditButtons}>
        <CarSelectButton id={id} name={name} color={color} />
        <CarDeleteButton id={id} totalCount={totalCount} />
      </div>
      <div className={styles.carRaceButtons}>
        <Button name="A" disabled={carInMotion?.isDriving || false} onClick={startEngineHandler} />
        <Button name="B" disabled={carInMotion?.isStop || false} onClick={stopEngineHandler} />
      </div>
      <div style={{ transform: `translateX(${carInMotion?.coordinate || 0}px)` }}>
        <CarIcon fill={color} />
      </div>
    </section>
  );
}
export default Car;
