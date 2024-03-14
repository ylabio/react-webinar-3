import React, {useEffect, useState} from 'react';
import './style.css'
import PropTypes from "prop-types";

const Pagination = ({ currentPage, changePage, totalPages, count }) => {

  const [pages, setPages] = useState([]);

  useEffect(() => {
    renderPages()
  }, [currentPage, count]);

  const renderPages = () => {
    const last = totalPages - 1
    let pages

    if ((currentPage >= 0) && (currentPage < 2)) {
      pages = [0, 1, 2, '...', last]
    } else if (currentPage === 2) {
      pages = [0, 1, 2, 3, '...', last]
    } else if ((currentPage <= last) && (currentPage > last - 2)) {
      pages = [0 , '...', last - 2, last - 1, last]
    } else if (currentPage === last - 2) {
      pages = [0 , '...', last - 3, last - 2, last - 1, last]
    } else {
      pages = [0, '...', currentPage - 1, currentPage, currentPage + 1, '...', last]
    }

    setPages(pages)
  }

  const loadByPage = (page) => {
    changePage(page)
  }

  return (
    <div className='Pagination'>
      {pages.map((page, i) => typeof page === 'number' ? (
        <span
          className={`Pagination-page ${currentPage === page ? 'active' : ''}`}
          key={i}
          onClick={() => loadByPage(page)}
        >
          {page + 1}
        </span>) : (
          <span
            className='Pagination-space'
            key={i}
          >
            {page}
          </span>
        )
      )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  totalPages: PropTypes.number
}

export default React.memo(Pagination);
