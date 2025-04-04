import React from 'react';
import './style.css';
import { createPagination } from '../../utils';

function PaginationList({ page, totalPages, onChange}) {

  const pages = createPagination(page, totalPages);
  return (
    <div className='pagination__list'>
        {pages.map((p, i) => (
          <button
            key={i}
            className={`pagination__button${p === page ? ' pagination__button--active' : ''}`}
            disabled={p === '...'}
            onClick={() => typeof p === 'number' && onChange(p)}
          >
            {p}
          </button>
        ))}
      </div>
  )
}

export default PaginationList;