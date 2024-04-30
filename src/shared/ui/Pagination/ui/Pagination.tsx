import { DOTS } from '../../../lib/const';
import Button from '../../Button/Button';
import usePagination from '../model/usePagination';
import styles from './style.module.scss';

export type PaginationProps = {
  onPageChange: (page: number) => void;
  totalCount: number | undefined;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

function Pagination({
  onPageChange,
  totalCount,
  siblingCount,
  currentPage,
  pageSize,
}: PaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  const lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  let dotsIndex = 0;

  if (currentPage === 0) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className={styles.pagination}>
      <h2>
        Page #
        {currentPage}
      </h2>
      <div className={styles.paginationButtons}>
        <Button key="left" name="<<" onClick={onPrevious} disabled={currentPage === 1} />
        {paginationRange
          && paginationRange.map((pageNumber) => {
            if (pageNumber === DOTS) {
              dotsIndex += 1;
              return <div key={DOTS + dotsIndex}>&#8230;</div>;
            }
            return (
              <Button
                key={pageNumber}
                onClick={() => onPageChange(Number(pageNumber))}
                name={pageNumber}
              />
            );
          })}
        <Button key="right" name=">>" onClick={onNext} disabled={currentPage === lastPage} />
      </div>
    </div>
  );
}

Pagination.defaultProps = {
  siblingCount: 1,
};

export default Pagination;
