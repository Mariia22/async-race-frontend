import { useCallback } from 'react';
import { carApi } from '../../../entities/car/api/carApi';
import Form from '../../../shared/ui/Form/Form';
import { useAppDispatch, useAppSelector } from '../../../shared/model/hooks';
import {
  resetTemplateForCreatingCar,
  setNewCarColor,
  setNewCarName,
  templateForCreatingCar,
} from '../../../entities/car/model/carSlice';

function CarCreateForm() {
  const dispatch = useAppDispatch();
  const [createCar] = carApi.useCreateCarMutation();
  const newCar = useAppSelector(templateForCreatingCar);

  const createCarHandler = useCallback(
    async (id: number, name: string, color: string) => {
      await createCar({ id, name, color });
      dispatch(resetTemplateForCreatingCar());
    },
    [createCar],
  );

  const setCarName = (name: string) => {
    dispatch(setNewCarName(name));
  };

  const setCarColor = (color: string) => {
    dispatch(setNewCarColor(color));
  };

  return (
    <Form
      name="Create"
      initialState={newCar}
      clickHandler={createCarHandler}
      changeNameHandler={setCarName}
      changeColorHandler={setCarColor}
    />
  );
}

export default CarCreateForm;
