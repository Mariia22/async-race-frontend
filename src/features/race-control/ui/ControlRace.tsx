import { useCallback, useState } from 'react';
import { carApi } from '../../../entities/car/api/carApi';
import { stopRace } from '../../../entities/race/model/raceSlice';
import { useAppDispatch } from '../../../shared/model/hooks';
import Button from '../../../shared/ui/Button/Button';
import useRace from '../model/hooks';
import { CarItemType } from '../../../entities/car/model/types';

function ControlRace() {
  const dispatch = useAppDispatch();
  const [stopEngine] = carApi.useStopEngineMutation();
  const { raceAll, startRace } = useRace();
  const [raceIsStarted, setRaceStart] = useState<boolean>(false);
  // TODO: add current page from redux
  const { data } = carApi.useGetAllCarsQuery(1);

  const resetHandler = useCallback(() => {
    setRaceStart(false);
    data?.result.forEach((car) => {
      stopEngine(car.id)
        .unwrap()
        .then(() => dispatch(stopRace()))
        .catch((error) => console.log(error));
    });
  }, [data?.result, dispatch, stopEngine]);

  const raceHandler = useCallback(async () => {
    setRaceStart(true);
    const cars = data?.result;
    if (cars) {
      const promises = [];
      const addPromise = async (car: CarItemType) => {
        const promise = await startRace(car.id);
        return promise;
      };
      for (let i = 0; i < cars.length; i += 1) {
        promises.push(addPromise(cars[i]));
      }
      await raceAll(
        promises,
        cars.map((item) => item.id),
        cars,
      );
    }
  }, [data?.result, raceAll, startRace]);

  return (
    <div>
      <Button name="Race" disabled={raceIsStarted} onClick={raceHandler} />
      <Button name="Reset" disabled={!raceIsStarted} onClick={resetHandler} />
    </div>
  );
}

export default ControlRace;
