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
  const {
    onClick = page => {},
    itemsPerPage,
    setItemsPerPage = items => {},
    currentPage,
    totalPages,
  } = props;

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

  const onPageHandler = useCallback(page => {
    if (page === '...') return;
    onClick(page);
  }, []);

  const itemsPerPageChangeHandler = useCallback(e => {
    const page = 1;
    setItemsPerPage(+e.target.value);
    onClick(page);
  }, []);

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
  onClick: PropTypes.func,
  setItemsPerPage: PropTypes.func,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
};

export default memo(Pagination);
