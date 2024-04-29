import { useMemo } from 'react';
import { range } from '../../../lib/functions';
import type { PaginationProps } from '../ui/Pagination';
import { DOTS } from '../../../lib/const';

type Props = Omit<PaginationProps, 'onPageChange' | 'className'>;

const usePagination = ({
  totalCount = 0, pageSize, siblingCount = 1, currentPage,
}: Props) => {
  const paginationRange = useMemo(() => {
    let result: (string | number)[] = [];
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);
    const shouldShowLeftDOTS = leftSiblingIndex > 2;
    const shouldShowRightDOTS = rightSiblingIndex < totalPageCount - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDOTS && shouldShowRightDOTS) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      result = [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDOTS && !shouldShowRightDOTS) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      result = [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDOTS && shouldShowRightDOTS) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      result = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    return result;
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

export default usePagination;
