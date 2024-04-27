import { carApi } from '../../../entities/car/api/carApi';
import { winnerApi } from '../../../entities/winner/api/winnerApi';
import Button from '../../../shared/ui/Button/Button';

type Props = {
  id: number;
};

function CarDeleteButton({ id }: Props) {
  const [deleteCar, { isLoading, isError, error }] = carApi.useDeleteCarMutation();
  const [deleteWinner] = winnerApi.useDeleteWinnerMutation();
  const [getWinner] = winnerApi.useLazyGetWinnerQuery();

  async function removeCar(carId: number) {
    if (!carId) {
      return <div>Car id is undefined</div>;
    }
    const res = await getWinner(carId);
    if (res.isSuccess) {
      await deleteWinner(carId);
    }
    return deleteCar(carId);
    // TODO pagination
    // if (
    //   this.state.pageNumber === getLastPage(this.state.totalNumber) &&
    //   Number(this.state.totalNumber) % LIMIT === 1
    // ) {
    //   this.state = { ...this.state, pageNumber: this.state.pageNumber - 1 };
    // }
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
