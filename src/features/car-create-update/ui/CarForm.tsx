import { selectedCar } from '../../../entities/car/model/carSlice';
import { useAppSelector } from '../../../shared/model/hooks';
import Button from '../../../shared/ui/Button/Button';

type Props = {
  name: string;
  onClick: () => void;
};

function CarForm({ name, onClick }: Props) {
  const updatedCar = useAppSelector(selectedCar);
  console.log(updatedCar);
  return (
    <form>
      <input type="text" placeholder="Car name" />
      <input type="color" />
      <Button name={name} isFormSubmit onClick={onClick} />
    </form>
  );
}

export default CarForm;
