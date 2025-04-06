import { memo } from 'react';
import PropTypes from 'prop-types';
import PageSizeSelect from '../page-size-select/index.js';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Pagination({ page, limit, totalItems, onChange, onChangeLimit }) {
  const cn = bem('Pagination');
  const totalPages = Math.ceil(totalItems / limit) || 1;

  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    pages.push(1);
    if (page > 3) pages.push('...');
    if (page === 1 || page === 2) {
      pages.push(2, 3);
    } else if (page === totalPages || page === totalPages - 1) {
      pages.push(totalPages - 2, totalPages - 1);
    } else {
      pages.push(page - 1, page, page + 1);
    }
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const handleLimitChange = newLimit => {
    const newTotalPages = Math.ceil(totalItems / newLimit) || 1;
    const newPage = page > newTotalPages ? newTotalPages : 1;
    onChangeLimit(newLimit);
    onChange(newPage);
  };

  return (
    <div className={cn()}>
      <div className={cn('controls')}>
        <PageSizeSelect limit={limit} onChangeLimit={handleLimitChange} onChangePage={onChange} />
        <div className={cn('list')}>
          {getPages().map((p, i) => (
            <button
              key={`${p}-${i}`}
              onClick={() => typeof p === 'number' && onChange(p)}
              className={`Pagination-button ${p === page ? 'active' : ''}`}
              disabled={p === '...'}
              aria-label={typeof p === 'number' ? `Страница ${p}` : 'Разделитель'}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeLimit: PropTypes.func.isRequired,
};

export default memo(Pagination);
