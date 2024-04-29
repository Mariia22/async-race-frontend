import { WINNERSPERPAGE } from '../../../shared/lib/const';
import Pagination from '../../../shared/ui/Pagination/ui/Pagination';
import { winnerApi } from '../../../entities/winner/api/winnerApi';
import { Winner } from '../../../entities/winner/model/types';
import CarIcon from '../../../entities/car/assets/car.svg?react';
import { useAppDispatch, useAppSelector } from '../../../shared/model/hooks';
import {
  selectedCurrentWinnerPage,
  setWinnerCurrentPage,
} from '../../../entities/winner/model/winnerSlice';

function WinnersPage() {
  let content;
  const currentPage = useAppSelector(selectedCurrentWinnerPage);
  const dispatch = useAppDispatch();
  const {
    data, isLoading, isFetching, isSuccess, isError, error,
  } = winnerApi.useGetAllWinnersQuery({
    page: currentPage,
    limit: WINNERSPERPAGE,
    sort: null,
    order: null,
  });

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (!isFetching && data?.count === 0) {
    content = <div>There are no winners</div>;
  }

  if (isError) {
    console.log(error);
    content = <div>error</div>;
  }

  if (isSuccess) {
    content = (
      <>
        <table>
          <thead>
            <tr>
              <td>Number</td>
              <td>Car</td>
              <td>Name</td>
              <td onClick={() => console.log('sort')}>Wins</td>
              <td onClick={() => console.log('time')}>Best times(seconds)</td>
            </tr>
          </thead>
          <tbody>
            {data?.result.map((winner: Winner) => (
              <tr key={winner.id}>
                <td>{winner.id}</td>
                <td aria-label="Car label">
                  <CarIcon fill={winner.color} />
                </td>
                <td>{winner.name}</td>
                <td>{winner.wins}</td>
                <td>{winner.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalCount={data?.count}
          pageSize={WINNERSPERPAGE}
          onPageChange={(page) => dispatch(setWinnerCurrentPage(page))}
        />
      </>
    );
  }

  return (
    <>
      <h1>
        WINNERS (
        {data?.count || 0}
        )
      </h1>
      <h2>
        Page #
        {currentPage}
      </h2>
      {content}
    </>
  );
}
export default WinnersPage;
