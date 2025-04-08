import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { getPageNumbers } from '../../store/navigation';
import Select from '../select';
import './style.css';

function Footer(props) {

  const itemsPerPageOptions = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '20', label: '20' },
  ];

  const visiblePageCount = 4;
  const pageNumbers = getPageNumbers(props.currentPage, props.totalPages, visiblePageCount);

  return (
    <div className="footer">
      <div>
        <label htmlFor="itemsPerPage">{props.itemsOnPageText}</label>
        <Select
          value={props.itemsPerPage}
          onChange={props.onItemsPerPageChange}
          options={itemsPerPageOptions}
          className="select-footer"
        />
      </div>

      <div>
        {/* Первая страница */}
        {pageNumbers[0] !== 1 && (
          <>
            <button onClick={() => props.onPageChange(1)}>1</button>
            {pageNumbers[0] !== 2 && <span>...</span>}
          </>
        )}

        {/* Другие страницы */}
        {pageNumbers.map((number, index) => (
          <button
            key={index}
            onClick={() => typeof number === 'number' && props.onPageChange(number)}
            className={number === props.currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}

        {/* Последняя страница */}
        {pageNumbers[pageNumbers.length - 1] !== props.totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] !== props.totalPages - 1 && <span>...</span>}
            <button onClick={() => props.onPageChange(totalPages)}>{props.totalPages}</button>
          </>
        )}
      </div>
    </div>
  );
}

Footer.propTypes = {
  itemsOnPageText: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default memo(Footer);
