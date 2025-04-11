import { range } from '../utils';

export const pagination = ({ totalItems, limit, siblingPages, currentPage }) => {
  const maxVisiblePages = 7;
  const totalPages = Math.ceil(totalItems / limit);

  if (totalPages <= maxVisiblePages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingPages, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingPages, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex <= totalPages - 2;
  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 1 + 2 * siblingPages;
    const leftRange = range(1, leftItemCount);
    const middleRange = currentPage === 3 ? [4] : [];

    return [...leftRange, ...middleRange, 'dots', totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 1 + 2 * siblingPages;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    const middleRange = currentPage === totalPages - 2 ? [totalPages - 3] : [];
    return [firstPageIndex, 'dots', ...middleRange, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, 'dots', ...middleRange, 'dots', lastPageIndex];
  }
};
