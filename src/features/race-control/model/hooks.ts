import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useErrorBoundary } from 'react-error-boundary';
import { carApi } from '../../../entities/car/api/carApi';
import { RaceWinner } from '../../../entities/race/model/types';
import { StatusCode } from '../../../shared/lib/types';
import { useAnimation } from '../../../shared/model/hooks';
import { CarItemType } from '../../../entities/car/model/types';
import useUpdateWinner from '../../winner-create-or-update/model/hooks';

const useRace = () => {
  const { startAnimation, cancelAnimation } = useAnimation();
  const { createUpdateWinner } = useUpdateWinner();
  const [startEngine] = carApi.useStartEngineMutation();
  const [driveEngine] = carApi.useDriveEngineMutation();
  const { showBoundary } = useErrorBoundary();

  async function writeWinner(result: RaceWinner, cars: CarItemType[] | undefined) {
    if (result.distance && result.velocity) {
      const time = Number((result.distance / result.velocity / 1000).toFixed(2));
      try {
        await createUpdateWinner(result, time);
      } catch (error) {
        showBoundary(error);
      }
      const winnerCar = cars?.find((car) => car.id === result.id);
      if (winnerCar) {
        return { winnerCar, time };
      }
    }
    return null;
  }

  async function raceAll(
    promises: Promise<RaceWinner>[],
    ids: number[],
    cars: CarItemType[],
  ): Promise<RaceWinner | null> {
    const result = await Promise.race(promises);

    if (!result.success) {
      const index = ids.findIndex((item) => item === result.id);
      const restPromises = [
        ...promises.slice(0, index),
        ...promises.slice(index + 1, promises.length),
      ];
      const restIndexes = [...ids.slice(0, index), ...ids.slice(index + 1, ids.length)];
      return raceAll(restPromises, restIndexes, cars);
    }
    return result;
  }

  async function startRace(id: number, screenDistance: number): Promise<RaceWinner> {
    const startMode = await startEngine(id).unwrap();
    if (startMode) {
      startAnimation(id, Math.min(startMode.distance / startMode.velocity), screenDistance);
    }
    const driveMode = await driveEngine(id)
      .unwrap()
      .catch((error: FetchBaseQueryError) => {
        if (
          error
          && 'originalStatus' in error
          && error.originalStatus === StatusCode.InternalServerError
        ) {
          cancelAnimation(id);
        } else {
          showBoundary(error);
        }
      });
    return { id, ...driveMode, ...startMode };
  }
  return { raceAll, startRace, writeWinner };
};

export default useRace;
