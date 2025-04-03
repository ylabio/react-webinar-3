import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({ page, onChange }) {
  const totalPages = 25;

  const getPages = () => {
    const pages = [];

    if (page <= 3) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (page >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
    }

    return pages;
  };

  return (
    <div className="Pagination">
      <div className="Pagination-pages">
        {getPages().map((p, i) => (
          <button
            key={i}
            onClick={() => typeof p === 'number' && onChange(p)}
            className={p === page ? 'active' : ''}
            disabled={p === '...'}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(Pagination);
