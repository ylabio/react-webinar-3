import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';


function Pagination({ currentPage = 1, totalPages = 25, onPageChange = ()=>{} }) {
  const cn = bem('Pagination');
  let pages = [];

  if (currentPage <= 2) {
    pages = [1, 2, 3, '...', totalPages];
  } else if (currentPage >= totalPages - 2) {
    pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
  } else {
    pages = [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
    for (let i = 1; i < pages.length; i++) {
      if (pages[i - 1] !== pages[i] - 1) {
        pages.splice(i, 0, '...');
        i++;
      }
    }
  }
 
  return (
    <div className={cn()}>
      {pages.map((page, index) => (
        page === '...' ? (
          <button key={index} className={cn('page')} disabled>...</button>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? cn('page active') : cn('page')}
          >
            {page}
          </button>
        )
      ))}
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Pagination;