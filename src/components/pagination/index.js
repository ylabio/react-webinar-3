import { memo, useCallback } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Select from '../select';
import PaginationItem from '../pagination-item';

const options = [
  { value: 5, text: '5' },
  { value: 10, text: '10' },
  { value: 20, text: '20' },
];

function Pagination(props) {
  const { totalItems = 0, itemsPerPage, setItemsPerPage, setCurrentPage, currentPage } = props;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const generatePageNumbers = useCallback(() => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage < 3) {
        pages.push(2, 3, '...');
      } else if (currentPage === 3) {
        pages.push(2, 3, 4, '...');
      } else if (currentPage > totalPages - 2) {
        pages.push('...', totalPages - 2, totalPages - 1);
      } else if (currentPage === totalPages - 2) {
        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
      }

      pages.push(totalPages);
    }

    return pages;
  }, [totalPages, currentPage]);

  const onPageHandler = useCallback(
    page => {
      if (page === '...') return;
      setCurrentPage(page);
    },
    [setCurrentPage],
  );

  const itemsPerPageChangeHandler = useCallback(
    e => {
      setItemsPerPage(+e.target.value);
      setCurrentPage(1);
    },
    [setCurrentPage],
  );

  return (
    <div className="Pagination">
      <Select value={itemsPerPage} onChange={itemsPerPageChangeHandler} options={options} />
      {generatePageNumbers().map((item, index) => (
        <PaginationItem
          key={index}
          isActive={item === currentPage}
          item={item}
          onClick={() => onPageHandler(item)}
        />
      ))}
    </div>
  );
}

Pagination.propTypes = {
  count: PropTypes.number,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default memo(Pagination);
