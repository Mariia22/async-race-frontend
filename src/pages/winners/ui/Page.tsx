import { useState } from 'react';
import { MESSAGES, WINNERSPERPAGE } from '../../../shared/lib/const';
import Pagination from '../../../shared/ui/Pagination/ui/Pagination';
import { winnerApi } from '../../../entities/winner/api/winnerApi';
import {
  Order, Sort, SortOrderType, Winner,
} from '../../../entities/winner/model/types';
import CarIcon from '../../../entities/car/assets/car.svg?react';
import { useAppDispatch, useAppSelector } from '../../../shared/model/hooks';
import {
  selectedCurrentWinnerPage,
  setWinnerCurrentPage,
} from '../../../entities/winner/model/winnerSlice';
import { serverErrorHandler } from '../../../shared/lib/functions';

function WinnersPage() {
  let content;
  const [sortAndOrder, setSortAndOrder] = useState<SortOrderType>({ sort: null, order: null });
  const currentPage = useAppSelector(selectedCurrentWinnerPage);
  const dispatch = useAppDispatch();
  const {
    data, isLoading, isFetching, isSuccess, isError, error,
  } = winnerApi.useGetAllWinnersQuery({
    page: currentPage,
    limit: WINNERSPERPAGE,
    sort: sortAndOrder.sort,
    order: sortAndOrder.order,
  });

  function sortTable(sort: Sort) {
    return sortAndOrder.order === Order.ASC
      ? setSortAndOrder({ sort, order: Order.DESC })
      : setSortAndOrder({ sort, order: Order.ASC });
  }

  if (isLoading) {
    content = <div>{MESSAGES.loading}</div>;
  }

  if (!isFetching && data?.count === 0) {
    content = <div>{MESSAGES.noWinners}</div>;
  }

  if (isError) {
    content = <div>{`${MESSAGES.pageNotLoad} ${serverErrorHandler(error)}`}</div>;
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
              <td onClick={() => sortTable(Sort.wins)}>Wins</td>
              <td onClick={() => sortTable(Sort.time)}>Best times(seconds)</td>
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
