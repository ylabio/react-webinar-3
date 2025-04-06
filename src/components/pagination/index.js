import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ curPage, maxPages, setPages = () => {},showItem, setShowItem=()=>{}}) {
  const cn = bem('Pagination');


  const generatePages = () => {
    let arrValPages;
    if (curPage - 1 <= 1) {
      arrValPages = [1, 2, 3, null, maxPages];
    } else if (curPage === 3) {
      arrValPages = [1, 2, 3, 4, null, maxPages];
    } else if (curPage > 3 && curPage <= maxPages - 3) {
      arrValPages = [1, null, curPage - 1, curPage, curPage + 1, null, maxPages];
    } else if (curPage -1 === maxPages - 3) {
      arrValPages = [1, null, maxPages - 3, maxPages - 2, maxPages - 1, maxPages];
    } else if (curPage  <= maxPages) {
      arrValPages = [1, null, maxPages - 2, maxPages - 1, maxPages];
    }
    return arrValPages;
  };
  
  const numberPages = generatePages();

  return (
    <div className={cn()}>
      <div className={cn('set')}>
        {[5, 10, 20].map((count) => (
          <button
            key={`items-${count}`}
            onClick={() => {
              setShowItem(count)
            }}
            className={showItem === count ? cn('set-active') : cn('set-inactive')}
          >
            {count}
          </button>
        ))}
      </div>
      <div className={cn('get')}>
        {numberPages.map((page, index) =>
          page ? (
            <button
              key={`page-${page}`}
              onClick={() => setPages(page)}
              className={curPage === page ? cn('get-active') : cn('get-inactive')}
            >
              {page}
            </button>
          ) : (
            <span key={`ellipsis-${index}`} className={cn('get-none')}>...</span>
          ),
        )}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  title: PropTypes.node,
};

export default memo(Pagination);
