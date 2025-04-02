import React from 'react';

const Pagination = ({ page, totalPages, onChange }) => {
  const createPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const pages = createPagination();

  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
      {pages.map((p, i) => (
        <button
          key={i}
          disabled={p === '...'}
          onClick={() => typeof p === 'number' && onChange(p)}
          style={{
            padding: '4px 8px',
            background: p === page ? '#ddd' : 'white',
            cursor: p === '...' ? 'default' : 'pointer',
            border: '1px solid #ccc',
            fontWeight: p === page ? 'bold' : 'normal',
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
