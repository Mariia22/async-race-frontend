import { useCallback, useEffect, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { carApi } from '../../../entities/car/api/carApi';
import { isRacing, setIsRacing, stopRace } from '../../../entities/race/model/raceSlice';
import { useAppDispatch, useAppSelector } from '../../../shared/model/hooks';
import Button from '../../../shared/ui/Button/Button';
import useRace from '../model/hooks';
import { CarItemType } from '../../../entities/car/model/types';
import Portal from '../../../shared/ui/Portal/ui/Portal';
import { RaceResult, RaceWinner } from '../../../entities/race/model/types';
import { MESSAGES } from '../../../shared/lib/const';
import styles from './style.module.scss';

type Props = {
  currentPage: number;
  screenSize: number;
};

function ControlRace({ currentPage, screenSize }: Props) {
  const isRaceStart = useAppSelector(isRacing);
  const dispatch = useAppDispatch();
  const [stopEngine] = carApi.useStopEngineMutation();
  const { raceAll, startRace, writeWinner } = useRace();
  const { data } = carApi.useGetAllCarsQuery(currentPage);
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [winner, setWinner] = useState<RaceResult | null>(null);
  const [raceResult, setRaceResult] = useState<RaceWinner | null>(null);
  const [raceError, setError] = useState<FetchBaseQueryError | null>(null);

  useEffect(() => {
    if (raceResult && isRaceStart) {
      writeWinner(raceResult, data?.result)
        .then((result) => setWinner(result))
        .then(() => setOpenModal(true))
        .catch((error) => setError(error));
    }
  }, [isRaceStart, raceResult]);

  const resetHandler = useCallback(() => {
    setRaceResult(null);
    dispatch(setIsRacing(false));
    data?.result.forEach((car) => {
      stopEngine(car.id)
        .unwrap()
        .then(() => dispatch(stopRace()))
        .catch((error) => setError(error));
    });
  }, [data?.result, dispatch, stopEngine]);

  const raceHandler = useCallback(async (): Promise<void> => {
    setRaceResult(null);
    dispatch(setIsRacing(true));
    const cars = data?.result;
    if (cars) {
      const promises = [];
      const addPromise = async (car: CarItemType) => {
        const promise = await startRace(car.id, screenSize);
        return promise;
      };
      for (let i = 0; i < cars.length; i += 1) {
        promises.push(addPromise(cars[i]));
      }
      const result = await raceAll(
        promises,
        cars.map((item) => item.id),
        cars,
      );
      if (result) setRaceResult(result);
    }
  }, [data?.result, raceAll, startRace, screenSize, dispatch]);

  return (
    <div className={styles.controlRace}>
      {raceError && <p>{raceError.status}</p>}
      <Button name="Race" disabled={isRaceStart} onClick={raceHandler} />
      <Button name="Reset" disabled={!isRaceStart} onClick={resetHandler} />
      {isModalOpen && (
        <Portal closePortal={() => setOpenModal(false)}>
          {winner ? (
            <div className={styles.controlRacePortal}>
              <div>
                Winner:
                {` ${winner.winnerCar.name} `}
              </div>
              <div>
                Time:
                {` ${winner.time} `}
              </div>
            </div>
          ) : (
            <div className={styles.controlRacePortal}>{MESSAGES.raceError}</div>
          )}
        </Portal>
      )}
    </div>
  );
}

export default ControlRace;
