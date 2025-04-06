import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CustomSelect from '../custom-select';

function Pagination({ page, limit, total, onChange, onChangeLimit }) {
  const totalPages = total && limit ? Math.ceil(total / limit) : 1;

  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (page <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (page >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
    }

    return pages;
  };

  return (
    <div className="Pagination">
      <CustomSelect value={limit} onChange={onChangeLimit} options={[5, 10, 20]} />
      <div className="Pagination-list">
        {getPages().map((p, i) => (
          <button
            key={i}
            onClick={() => typeof p === 'number' && onChange(p)}
            className={p === page ? 'active' : ''}
            disabled={p === '...'}
          >
            <span>{p}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeLimit: PropTypes.func.isRequired,
};

export default memo(Pagination);
