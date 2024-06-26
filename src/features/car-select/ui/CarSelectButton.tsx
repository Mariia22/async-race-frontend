import { useCallback } from 'react';
import { carSlice } from '../../../entities/car/model/carSlice';
import { CarItemType } from '../../../entities/car/model/types';
import { useAppDispatch } from '../../../shared/model/hooks';
import Button from '../../../shared/ui/Button/Button';

function CarSelectButton({ id, name, color }: CarItemType) {
  const dispatch = useAppDispatch();
  const { selectCar } = carSlice.actions;

  const selectCarHandler = useCallback(() => {
    dispatch(selectCar({ id, name, color }));
  }, [dispatch, selectCar, color, id, name]);

  return <Button name="Select" onClick={selectCarHandler} />;
}
export default CarSelectButton;
