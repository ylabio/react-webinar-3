import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({ currentPage, totalPages, setCurrentPage }) {

    console.log(totalPages)

    const getPageNumbers = () => {
        const pageNumbers = [];
    
        if (totalPages <= 5) {
          for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
          }
        } else {

          if (currentPage <= 2) {

            for (let i = 1; i <= 3; i++) {
              pageNumbers.push(i);
            }
            if (totalPages > 4) {
              pageNumbers.push('...');
            }
            pageNumbers.push(totalPages);

          } else if (currentPage >= totalPages - 1) {

            pageNumbers.push(1);

            if (totalPages > 4) {
              pageNumbers.push('...');
            }
            for (let i = totalPages - 2; i <= totalPages; i++) {
              pageNumbers.push(i);
            }

          } else {

            pageNumbers.push(1);
            if (currentPage > 3) {
              pageNumbers.push('...');
            }
            pageNumbers.push(currentPage - 1);
            pageNumbers.push(currentPage);
            pageNumbers.push(currentPage + 1);
            if (currentPage < totalPages - 2) {
              pageNumbers.push('...');
            }
            pageNumbers.push(totalPages);
          }
        }
    
        return pageNumbers;
      };
    
      const handlePageClick = (page) => {
        if (page !== '...' && page !== currentPage) {
          setCurrentPage(page);
        }
      };

    
      return (
        <div className="Pagination">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`Pagination-${page === "..." ? "skip" : "page"} ${page === currentPage ? 'active' : ''}`}
              onClick={() => handlePageClick(page)}
            >
              <div>{page}</div>
            </button>
          ))}
        </div>
      );

}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    setCurrentPage: PropTypes.func

};

Pagination.defaultProps = {
    currentPage: 1,
    totalPages: 1,
    setCurrentPage: () => {}
};

export default memo(Pagination);
