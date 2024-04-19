import { useMemo } from 'react';
import { range } from '../../../lib/functions';
import type { PaginationProps } from '../ui/Pagination';
import { dots } from '../../../lib/const';

type Props = Omit<PaginationProps, 'onPageChange' | 'className'>;

const usePagination = ({
  totalCount, pageSize, siblingCount = 1, currentPage,
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
    const shouldShowLeftdots = leftSiblingIndex > 2;
    const shouldShowRightdots = rightSiblingIndex < totalPageCount - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftdots && shouldShowRightdots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      result = [...leftRange, dots, totalPageCount];
    }

    if (shouldShowLeftdots && !shouldShowRightdots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      result = [firstPageIndex, dots, ...rightRange];
    }

    if (shouldShowLeftdots && shouldShowRightdots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      result = [firstPageIndex, dots, ...middleRange, dots, lastPageIndex];
    }
    return result;
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

export default usePagination;
