import {cn as bem} from '@bem-react/classname';
import './style.css';
import {codeGenerator} from '../../utils';

const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({length}, (_, idx) => idx + start);
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = () => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex <= totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount;
      if (currentPage === 1 || currentPage === 2) {
        leftItemCount = 3;
      } else if (currentPage === 3) {
        leftItemCount = 4;
      } else {
        leftItemCount = 3 + siblingCount * 2;
      }
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount;
      if (
        currentPage === totalPageCount ||
        currentPage === totalPageCount - 1
      ) {
        rightItemCount = 3;
      } else if (currentPage === totalPageCount - 2) {
        rightItemCount = 4;
      } else {
        rightItemCount = 3 + siblingCount * 2;
      }
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  };

  return paginationRange();
};

const numberGenerator = codeGenerator(0);

const Pagination = (props) => {
  const cn = bem('pagination');

  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  console.log(paginationRange);

  return (
    <ul className={cn('container')}>
      {paginationRange.map((pageNumber) => {
        const key = numberGenerator();
        if (pageNumber === DOTS) {
          return (
            <li key={key} className={cn('item dots')}>
              &#8230;
            </li>
          );
        }
        return (
          <li
            key={key}
            className={`pagination-item ${
              currentPage === pageNumber ? 'selected' : ''
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
