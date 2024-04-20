import { carSlice } from '../../../entities/car/model/carSlice';
import { useAppDispatch } from '../../../shared/model/hooks';
import Button from '../../../shared/ui/Button/Button';

type Props = {
  id: number;
};

function CarSelectButton({ id }: Props) {
  const dispatch = useAppDispatch();
  const { selectCar } = carSlice.actions;

  function chooseCar(carId: number) {
    dispatch(selectCar(carId));
  }

  return <Button name="Select" onClick={() => chooseCar(id)} />;
}
export default CarSelectButton;
