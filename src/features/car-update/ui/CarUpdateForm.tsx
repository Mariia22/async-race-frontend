import { useCallback, useState } from 'react';
import { carApi } from '../../../entities/car/api/carApi';
import {
  selectedCar,
  setActiveCarColor,
  setActiveCarName,
  unselectCar,
} from '../../../entities/car/model/carSlice';
import { useAppDispatch, useAppSelector } from '../../../shared/model/hooks';
import Form from '../../../shared/ui/Form/Form';
import { MESSAGES } from '../../../shared/lib/const';
import { serverErrorHandler } from '../../../shared/lib/functions';

function CarUpdateForm() {
  const dispatch = useAppDispatch();
  const updatedCar = useAppSelector(selectedCar);
  const [updateCar] = carApi.useUpdateCarMutation();
  const [error, setError] = useState<string | null>(null);

  const updateCarHandler = useCallback(
    async (id: number, name: string, color: string) => {
      try {
        await updateCar({ id, name, color });
        dispatch(unselectCar());
      } catch (err) {
        setError(`${MESSAGES.carIsNotUpdated} ${serverErrorHandler(err)}`);
      }
    },
    [dispatch, updateCar],
  );

  const setCarName = (name: string) => {
    dispatch(setActiveCarName(name));
  };

  const setCarColor = (color: string) => {
    dispatch(setActiveCarColor(color));
  };

  return (
    <>
      <Form
        name="Update"
        initialState={updatedCar}
        clickHandler={updateCarHandler}
        changeNameHandler={setCarName}
        changeColorHandler={setCarColor}
      />
      {error && <div>{error}</div>}
    </>
  );
}

export default CarUpdateForm;
