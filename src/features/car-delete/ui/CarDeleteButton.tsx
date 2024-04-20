import { carApi } from '../../../entities/car/api/carApi';
import Button from '../../../shared/ui/Button/Button';

type Props = {
  id: number;
};

function CarDeleteButton({ id }: Props) {
  const [deleteCar, { isLoading, isError, error }] = carApi.useDeleteCarMutation();

  async function removeCar(carId: number) {
    if (!carId) {
      return <div>Car id is undefined</div>;
    }
    return deleteCar(carId);
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    console.error(error);
    return <div>Error</div>;
  }

  return <Button name="Remove" onClick={() => removeCar(id)} />;
}
export default CarDeleteButton;
