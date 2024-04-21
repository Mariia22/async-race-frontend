import { useCallback } from 'react';
import { carApi } from '../../../entities/car/api/carApi';
import Button from '../../../shared/ui/Button/Button';

function CarStartEngine({ id }: { id: number }) {
  const [startEngine] = carApi.useStartEngineMutation();

  const startEngineHandler = useCallback(async () => {
    const result = await startEngine(id);
    console.log(result);
  }, [startEngine, id]);

  return <Button name="A" onClick={startEngineHandler} />;
}
export default CarStartEngine;
