import React from 'react';
import './style.css';

const PaginationDots = () => {

  return (
    <div>
      <li className="Pagination__item Pagination__item_dots">
        <div>
          <span className="Pagination__dots">...</span>
        </div>
      </li>
    </div>
  );
};

export default PaginationDots;