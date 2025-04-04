import React from 'react';

function PaginationLimit({ limit, setLimit, setPage }) {
  return (
    <div className="pagination__limit">
      <label htmlFor="limit">Показать по:&nbsp;</label>
      <select
        id="limit"
        value={limit}
        onChange={(e) => {
          setLimit(Number(e.target.value));
          setPage(1);
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  )
}

export default PaginationLimit;