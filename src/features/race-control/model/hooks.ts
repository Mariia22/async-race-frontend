import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { carApi } from '../../../entities/car/api/carApi';
import { RaceResult, RaceWinner } from '../../../entities/race/model/types';
import { StatusCode } from '../../../shared/lib/types';
import { useAnimation } from '../../../shared/model/hooks';
import { CarItemType } from '../../../entities/car/model/types';
import useUpdateWinner from '../../winner-create-or-update/model/hooks';

const useRace = () => {
  const { startAnimation, cancelAnimation } = useAnimation();
  const { createUpdateWinner } = useUpdateWinner();
  const [startEngine] = carApi.useStartEngineMutation();
  const [driveEngine] = carApi.useDriveEngineMutation();

  async function raceAll(
    promises: Promise<RaceWinner>[],
    ids: number[],
    cars: CarItemType[],
  ): Promise<RaceResult | null> {
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
    if (result.distance && result.velocity) {
      const time = Number((result.distance / result.velocity / 1000).toFixed(2));
      await createUpdateWinner(result, time);
      const winnerCar = cars?.find((car) => car.id === result.id);
      if (winnerCar) {
        return { winnerCar, time };
      }
      return null;
    }
    return null;
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
          console.error(error);
        }
      });
    return { id, ...driveMode, ...startMode };
  }
  return { raceAll, startRace };
};

export default useRace;
