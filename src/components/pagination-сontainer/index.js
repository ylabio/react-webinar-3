import { memo } from 'react';
import PropTypes from 'prop-types';
import PaginationView from "../pagination-view";

const PaginationContainer = ({totalPages, currentPage, onPageChange}) => {


  const pages = getPaginationRange(currentPage, totalPages);


  return (
    <div className="Pagination">
      {pages.map((item, index) =>
        item === 'dots' ? (
          <span key={`dots-${index}`}>...</span>
        ) : (
          <button
            key={item}
            className={item === currentPage ? 'active' : ''}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        )
      )}
    </div>
  );



  /*const range = (start, end) => {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  };

  const generatePaginationGroups = () => {
    if (totalPages <= 7) {
      return {
        composition: 'start',
        startGroup: range(1, totalPages),
      };
    }

    if (currentPage < 3) {
      return {
        composition: 'start',
        startGroup: [1, 2, 3],
        separatorStart: true,
        endGroup: [totalPages],
      };
    }

    if (currentPage === 3) {
      return {
        composition: 'postStart',
        startGroup: [1, 2, 3, 4],
        separatorStart: true,
        endGroup: [totalPages],
      };
    }

    if (currentPage > totalPages - 2) {
      return {
        composition: 'end',
        startGroup: [1],
        separatorEnd: true,
        endGroup: [totalPages - 2, totalPages - 1, totalPages],
      };
    }

    if (currentPage === totalPages - 2) {
      return {
        composition: 'preEnd',
        startGroup: [1],
        separatorEnd: true,
        endGroup: [totalPages - 3, totalPages - 2, totalPages - 1, totalPages],
      };
    }

    return {
      composition: 'center',
      startGroup: [1],
      centerGroup: [currentPage - 1, currentPage, currentPage + 1],
      endGroup: [totalPages],
      separatorStart: true,
      separatorEnd: true,
    };
  };

  const paginationProps = {
    currentPage,
    onPageSelect: onPageChange,
    ...generatePaginationGroups(),
  };

  return <PaginationView {...paginationProps} />;*/
};

PaginationContainer.propTypes = {
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
};

export default memo(PaginationContainer);
