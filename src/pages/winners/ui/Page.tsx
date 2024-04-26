import { useState } from 'react';
import { limitWinnersPerPage, routes } from '../../../shared/lib/const';
import Pagination from '../../../shared/ui/Pagination/ui/Pagination';
import { winnerApi } from '../../../entities/winner/api/winnerApi';
import { Winner } from '../../../entities/winner/model/types';
import CarIcon from '../../../entities/car/assets/car.svg?react';

function WinnersPage() {
  let content;
  let notification;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data, isLoading, isFetching, isSuccess, isError, error,
  } = winnerApi.useGetAllWinnersQuery({
    page: currentPage,
    limit: limitWinnersPerPage,
    sort: null,
    order: null,
  });

  if (isLoading) {
    notification = <div>Loading...</div>;
  }

  if (!isFetching && data?.count === 0) {
    notification = <div>There are no winners</div>;
  }

  if (isError) {
    console.log(error);
    notification = <div>error</div>;
  }

  if (isSuccess) {
    content = data?.result.map((winner: Winner) => (
      <tr key={winner.id}>
        <td>{winner.id}</td>
        <td aria-label="Car label">
          <CarIcon fill={winner.color} />
        </td>
        <td>{winner.name}</td>
        <td>{winner.wins}</td>
        <td>{winner.time}</td>
      </tr>
    ));
  }

  return (
    <>
      <h1>
        {routes[1].name}
        (
        {data?.count || 0}
        )
      </h1>
      <h2>
        Page #
        {currentPage}
      </h2>
      {notification}
      <table>
        <thead>
          <tr>
            <td>Number</td>
            <td>Car</td>
            <td>Name</td>
            <td>Wins</td>
            <td>Best times(seconds)</td>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalCount={2}
        pageSize={limitWinnersPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
export default WinnersPage;
