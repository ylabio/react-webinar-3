import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { DOTS, usePagination } from '../../hooks/usePagination';
import './style.css';

function Pagination({
  onPageChange = () => {},
  onPageSizeChange = () => {},
  totalItemsCount,
  currentPage,
  pageSize,
  itemsPerPageText = 'Товаров на страницу',
}) {
  const cn = bem('Pagination');

  const paginationRange = usePagination({
    currentPage,
    totalItemsCount,
    pageSize,
  });

  return (
    <div className={cn()}>
      <label>
        {itemsPerPageText}:
        <select value={pageSize} onChange={e => onPageSizeChange(Number(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </label>
      <ul className={cn('list')}>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li className={cn('item', 'dots')} key={index}>
                {DOTS}
              </li>
            );
          }

          return (
            <li
              className={`${pageNumber === currentPage ? cn('item', { selected: true }) : cn('item')}`}
              onClick={() => onPageChange(pageNumber)}
              key={index}
            >
              {pageNumber}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalItemsCount: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  itemsPerPageText: PropTypes.string,
};

export default memo(Pagination);
