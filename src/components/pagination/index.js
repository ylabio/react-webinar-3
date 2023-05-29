import {useState, useEffect, memo, useLayoutEffect} from 'react';
import {cn as bem} from '@bem-react/classname'
import './style.css';
import PropTypes from "prop-types";

function Pagination({currentPage, totalPages, onPageClick }) {
  const cn = bem('Pagination');
  const [visiblePages, setVisiblePages] = useState([]);

  const callbacks = {
    onPageClick: (page) => {
      onPageClick(page);
    }
  }

  useLayoutEffect(() => {
    const generateButtons = () => {
      const dots = '...';
      const allPages = Array.from({ length: totalPages }, (_, index) => index + 1);

      if (totalPages < 6) {
        setVisiblePages(allPages);
      } else if (currentPage >= 1 && currentPage <= 2) {
        setVisiblePages([1, 2, 3, dots, totalPages]);
      } else if (currentPage === 3) {
        const sliced = allPages.slice(0, 4);
        setVisiblePages([...sliced, dots, totalPages]);
      } else if (currentPage >= 4 && currentPage < totalPages - 2) {
        const sliced1 = allPages.slice(currentPage - 2, currentPage);
        const sliced2 = allPages.slice(currentPage, currentPage + 1);
        setVisiblePages([1, dots, ...sliced1, ...sliced2, dots, totalPages]);
      } else if (currentPage > totalPages - 3) {
        const sliced = allPages.slice(totalPages - 4);
        setVisiblePages([1, dots, ...sliced]);
      }
    };

      generateButtons();

    }, [currentPage, totalPages]);

  return (
    <div className={cn()}>
      {visiblePages.map((item, index) => (
      <span
        key={index}
        className={item === '...' ? cn('dots') : cn('page', {active: currentPage === item})}
        onClick={() => callbacks.onPageClick(item)}
      >
        {item}
      </span>
    ))}
    </div>
    );
}

export default memo(Pagination);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired
}
