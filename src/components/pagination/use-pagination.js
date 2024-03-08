import {useMemo} from "react";

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount,
  currentPage
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

		const range = (start, end) => {
			let length = end - start + 1;
			return Array.from({ length }, (_, idx) => idx + start);
		};

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
	
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

		const leftItems = currentPage > firstPageIndex ? currentPage : currentPage + 1;
		const rightItems = currentPage < totalPageCount ? currentPage : currentPage - 1

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = leftItems + siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, "...", totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      
      let rightItemCount =  rightItems - siblingCount;
      let rightRange = range(rightItemCount, totalPageCount);
      return [firstPageIndex, "...", ...rightRange];
    }
     
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};