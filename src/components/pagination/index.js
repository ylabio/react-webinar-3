import React from 'react';
import './style.css';
import PaginationLimit from '../pagination-limit';
import PaginationList from '../pagination-list';

function Pagination({ page, limit, setLimit, setPage, totalPages, onChange }) {
  return (
    <div className='pagination'>
      <div className='pagination__container'>
        <PaginationLimit limit={limit} setLimit={setLimit} setPage={setPage}/>
        <PaginationList page={page} totalPages={totalPages} onChange={onChange}/>
      </div>
    </div>
  );
};

export default Pagination;
