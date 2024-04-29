import { carApi } from '../../../entities/car/api/carApi';
import { selectedCurrentCarPage, setCarCurrentPage } from '../../../entities/car/model/carSlice';
import { winnerApi } from '../../../entities/winner/api/winnerApi';
import { CARSPERPAGE, MESSAGES } from '../../../shared/lib/const';
import { checkIsPageLast } from '../../../shared/lib/functions';
import { useAppDispatch, useAppSelector } from '../../../shared/model/hooks';
import Button from '../../../shared/ui/Button/Button';

type Props = {
  id: number;
  totalCount: number;
};

function CarDeleteButton({ id, totalCount }: Props) {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectedCurrentCarPage);
  const [deleteCar, { isLoading, isError, error }] = carApi.useDeleteCarMutation();
  const [deleteWinner] = winnerApi.useDeleteWinnerMutation();
  const [getWinner] = winnerApi.useLazyGetWinnerQuery();

  async function removeCar(carId: number) {
    if (checkIsPageLast(totalCount, CARSPERPAGE, currentPage)) {
      dispatch(setCarCurrentPage(currentPage - 1));
    }
    if (!carId) {
      return <div>Car id is undefined</div>;
    }
    const res = await getWinner(carId);
    if (res.isSuccess) {
      await deleteWinner(carId);
    }
    return deleteCar(carId);
  }

  if (isLoading) {
    return <div>{MESSAGES.loading}</div>;
  }

  if (isError) {
    console.error(error);
    return <div>{MESSAGES.carIsNotDeleted}</div>;
  }

  return <Button name="Remove" onClick={() => removeCar(id)} />;
}
export default CarDeleteButton;
