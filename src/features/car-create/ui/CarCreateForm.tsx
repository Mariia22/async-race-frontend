import { useCallback } from 'react';
import { carApi } from '../../../entities/car/api/carApi';
import { initialCar } from '../../../shared/lib/const';
import Form from '../../../shared/ui/Form/Form';

function CarCreateForm() {
  const [createCar] = carApi.useCreateCarMutation();

  const createCarHandler = useCallback(
    async (id: number, name: string, color: string) => {
      await createCar({ id, name, color });
    },
    [createCar],
  );

  return <Form name="Create" initialState={initialCar} clickHandler={createCarHandler} />;
}

export default CarCreateForm;
