import { useMemo } from 'react';

export const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ([totalCount, pageSize, currentPage]) => {
  const paginationRange = useMemo(() => {
    let siblingCount = 1;

    // Высчитываем общее количество страниц
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Количество кнопок на странице
    const totalPageNumbers = siblingCount + 5;

    // Краевой случай когда кнопок больше чем страниц
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    // Определяем когда и где будут появляться "..."
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

    if (currentPage <= 2) {
      let leftItemCount = 3;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 4;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [1, DOTS, ...middleRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 4;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );

      return [1, DOTS, ...rightRange];
    }
  }, [totalCount, pageSize, currentPage]);

  return paginationRange;
};
