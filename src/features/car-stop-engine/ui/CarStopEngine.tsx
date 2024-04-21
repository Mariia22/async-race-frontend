import { useCallback } from 'react';
import { carApi } from '../../../entities/car/api/carApi';
import Button from '../../../shared/ui/Button/Button';

function CarStopEngine({ id }: { id: number }) {
  const [stopEngine] = carApi.useStopEngineMutation();

  const stopEngineHandler = useCallback(async () => {
    const result = await stopEngine(id);
    console.log(result);
  }, [stopEngine, id]);

  return <Button name="B" onClick={stopEngineHandler} />;
}
export default CarStopEngine;
