import { useCallback, useState } from 'react';
import { carApi } from '../../../entities/car/api/carApi';
import Form from '../../../shared/ui/Form/Form';
import { useAppDispatch, useAppSelector } from '../../../shared/model/hooks';
import {
  resetTemplateForCreatingCar,
  setNewCarColor,
  setNewCarName,
  templateForCreatingCar,
} from '../../../entities/car/model/carSlice';
import { MESSAGES } from '../../../shared/lib/const';
import { serverErrorHandler } from '../../../shared/lib/functions';

function CarCreateForm() {
  const dispatch = useAppDispatch();
  const [createCar] = carApi.useCreateCarMutation();
  const newCar = useAppSelector(templateForCreatingCar);
  const [error, setError] = useState<string | null>(null);

  const createCarHandler = useCallback(
    async (id: number, name: string, color: string) => {
      try {
        await createCar({ id, name, color });
        dispatch(resetTemplateForCreatingCar());
      } catch (err) {
        setError(`${MESSAGES.carIsNotCreated} ${serverErrorHandler(err)}`);
      }
    },
    [dispatch, createCar],
  );

  const setCarName = (name: string) => {
    dispatch(setNewCarName(name));
  };

  const setCarColor = (color: string) => {
    dispatch(setNewCarColor(color));
  };

  return (
    <>
      <Form
        name="Create"
        initialState={newCar}
        clickHandler={createCarHandler}
        changeNameHandler={setCarName}
        changeColorHandler={setCarColor}
      />
      {error && <div>{error}</div>}
    </>
  );
}

export default CarCreateForm;
