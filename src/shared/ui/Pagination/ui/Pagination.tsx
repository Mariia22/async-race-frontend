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

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  // const lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <div className={styles.pagination}>
      <Button key="left" name="<<" onClick={onPrevious} />
      {paginationRange
        && paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <div key="DOTS" className="pagination-item DOTS">
                &#8230;
              </div>
            );
          }
          return (
            <Button
              key={pageNumber}
              onClick={() => onPageChange(Number(pageNumber))}
              name={pageNumber}
            />
          );
        })}
      <Button key="right" name=">>" onClick={onNext} />
    </div>
  );
}

Pagination.defaultProps = {
  siblingCount: 1,
};

export default Pagination;
