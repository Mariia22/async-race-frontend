import { dots } from '../../../lib/const';
import usePagination from '../model/usePagination';

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
    <div key="left">
      <button type="button" onClick={onPrevious} onKeyDown={onPrevious} key="left">
        Left
      </button>
      {paginationRange
        && paginationRange.map((pageNumber) => {
          if (pageNumber === dots) {
            return <div className="pagination-item dots">&#8230;</div>;
          }
          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(Number(pageNumber))}
              onKeyDown={() => onPageChange(Number(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      <button type="button" onClick={onNext} onKeyDown={onNext}>
        Right
      </button>
    </div>
  );
}

Pagination.defaultProps = {
  siblingCount: 1,
};

export default Pagination;
