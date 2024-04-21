import { useCallback } from 'react';
import { carApi } from '../../../entities/car/api/carApi';
import { selectedCar } from '../../../entities/car/model/carSlice';
import { useAppSelector } from '../../../shared/model/hooks';
import Form from '../../../shared/ui/Form/Form';

function CarUpdateForm() {
  const updatedCar = useAppSelector(selectedCar);
  const [updateCar] = carApi.useUpdateCarMutation();

  const updateCarHandler = useCallback(
    async (id: number, name: string, color: string) => {
      await updateCar({ id, name, color });
    },
    [updateCar],
  );

  return <Form name="Update" initialState={updatedCar} clickHandler={updateCarHandler} />;
}

export default CarUpdateForm;
