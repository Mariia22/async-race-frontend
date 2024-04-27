import { useCallback, useState } from 'react';
import { carApi } from '../../../entities/car/api/carApi';
import { stopRace } from '../../../entities/race/model/raceSlice';
import { useAppDispatch } from '../../../shared/model/hooks';
import Button from '../../../shared/ui/Button/Button';
import useRace from '../model/hooks';
import { CarItemType } from '../../../entities/car/model/types';
import Portal from '../../../shared/ui/Portal/ui/Portal';
import { RaceResult } from '../../../entities/race/model/types';
import { messages } from '../../../shared/lib/const';

type Props = {
  currentPage: number;
  screenSize: number;
};

function ControlRace({ currentPage, screenSize }: Props) {
  const dispatch = useAppDispatch();
  const [stopEngine] = carApi.useStopEngineMutation();
  const { raceAll, startRace } = useRace();
  const [raceIsStarted, setRaceStart] = useState<boolean>(false);
  const { data } = carApi.useGetAllCarsQuery(currentPage);
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [winner, setWinner] = useState<RaceResult | null>(null);

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
      if (result) {
        setWinner(result);
      }
      setOpenModal(true);
    }
  }, [data?.result, raceAll, startRace, screenSize]);

  return (
    <div>
      <Button name="Race" disabled={raceIsStarted} onClick={raceHandler} />
      <Button name="Reset" disabled={!raceIsStarted} onClick={resetHandler} />
      {isModalOpen && (
        <Portal closePortal={() => setOpenModal(false)}>
          {winner ? (
            <div>
              Winner:
              {' '}
              {winner.winnerCar.name}
              Time:
              {' '}
              {winner.time}
            </div>
          ) : (
            <p>{messages.raceError}</p>
          )}
        </Portal>
      )}
    </div>
  );
}

export default ControlRace;
