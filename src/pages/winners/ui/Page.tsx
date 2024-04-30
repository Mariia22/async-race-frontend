import { MESSAGES, WINNERSPERPAGE } from '../../../shared/lib/const';
import Pagination from '../../../shared/ui/Pagination/ui/Pagination';
import { winnerApi } from '../../../entities/winner/api/winnerApi';
import { Order, Sort, Winner } from '../../../entities/winner/model/types';
import CarIcon from '../../../../public/assets/svg/car.svg?react';
import { useAppDispatch, useAppSelector } from '../../../shared/model/hooks';
import {
  selectedCurrentWinnerPage,
  selectedOrder,
  setWinnerCurrentPage,
  sortWinners,
} from '../../../entities/winner/model/winnerSlice';
import { serverErrorHandler } from '../../../shared/lib/functions';
import styles from './style.module.scss';

function WinnersPage() {
  let content;
  const sortAndOrder = useAppSelector(selectedOrder);
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
      ? dispatch(sortWinners({ sort, order: Order.DESC }))
      : dispatch(sortWinners({ sort, order: Order.ASC }));
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
        <table className={styles.winnerTable}>
          <thead className={styles.winnerThead}>
            <tr>
              <td className={styles.winnerTd}>Number</td>
              <td className={styles.winnerTd}>Car</td>
              <td className={styles.winnerTd}>Name</td>
              <td className={styles.winnerSort} onClick={() => sortTable(Sort.wins)}>
                Wins
              </td>
              <td className={styles.winnerSort} onClick={() => sortTable(Sort.time)}>
                Best times(sec)
              </td>
            </tr>
          </thead>
          <tbody>
            {data?.result.map((winner: Winner, index: number) => (
              <tr
                key={winner.id}
                className={index % 2 === 1 ? styles.winnerTyellow : styles.winnerTblack}
              >
                <td className={styles.winnerTd}>{winner.id}</td>
                <td className={styles.winnerTd} aria-label="Car label">
                  <CarIcon fill={winner.color} />
                </td>
                <td className={styles.winnerTd}>{winner.name}</td>
                <td className={styles.winnerTd}>{winner.wins}</td>
                <td className={styles.winnerTd}>{winner.time}</td>
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
    <section className={styles.winner}>
      <h1>
        WINNERS (
        {data?.count || 0}
        )
      </h1>
      {content}
    </section>
  );
}
export default WinnersPage;
