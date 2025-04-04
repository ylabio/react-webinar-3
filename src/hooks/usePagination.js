import { useMemo } from 'react';
import { range } from '../utils';

export const usePagination = ({ totalItems, limit, siblingPages, currentPage }) => {
  const paginationRange = useMemo(() => {
    console.log('paginationRange');
    const maxVisiblePages = 7;
    const totalPages = Math.ceil(totalItems / limit);

    if (totalPages <= maxVisiblePages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingPages, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingPages, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
    console.log({ currentPage, shouldShowLeftDots, shouldShowRightDots });
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 2 + 2 * siblingPages;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, 'dots', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      console.log('middle');
      let rightItemCount = 2 + 2 * siblingPages;
      let rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, 'dots', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, 'dots', ...middleRange, 'dots', lastPageIndex];
    }
  }, [totalItems, limit, siblingPages, currentPage]);

  return paginationRange;
};
