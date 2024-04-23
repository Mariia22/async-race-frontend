import { useCallback } from 'react';
import { carApi } from '../../../entities/car/api/carApi';
import { stopRace } from '../../../entities/race/model/raceSlice';
import { useAppDispatch } from '../../../shared/model/hooks';
import Button from '../../../shared/ui/Button/Button';

function ControlRace() {
  const dispatch = useAppDispatch();
  const [stopEngine] = carApi.useStopEngineMutation();
  const { data } = carApi.useGetAllCarsQuery(1);

  const resetHandler = useCallback(() => {
    dispatch(stopRace());
    data?.result?.forEach((car) => {
      stopEngine(car.id);
    });
  }, []);

  const raceHandler = useCallback(() => {
    dispatch(stopRace());
  }, []);

  return (
    <div>
      <Button name="Race" onClick={raceHandler} />
      <Button name="Reset" onClick={resetHandler} />
    </div>
  );
}

export default ControlRace;
