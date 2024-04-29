import { useCallback } from 'react';
import { carApi } from '../../../entities/car/api/carApi';
import {
  selectedCar,
  setActiveCarColor,
  setActiveCarName,
  unselectCar,
} from '../../../entities/car/model/carSlice';
import { useAppDispatch, useAppSelector } from '../../../shared/model/hooks';
import Form from '../../../shared/ui/Form/Form';

function CarUpdateForm() {
  const dispatch = useAppDispatch();
  const updatedCar = useAppSelector(selectedCar);
  const [updateCar] = carApi.useUpdateCarMutation();

  const updateCarHandler = useCallback(
    async (id: number, name: string, color: string) => {
      await updateCar({ id, name, color });
      dispatch(unselectCar());
    },
    [updateCar],
  );

  const setCarName = (name: string) => {
    dispatch(setActiveCarName(name));
  };

  const setCarColor = (color: string) => {
    dispatch(setActiveCarColor(color));
  };

  return (
    <Form
      name="Update"
      initialState={updatedCar}
      clickHandler={updateCarHandler}
      changeNameHandler={setCarName}
      changeColorHandler={setCarColor}
    />
  );
}

export default CarUpdateForm;
