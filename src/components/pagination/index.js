import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({
  currentPage,
  onPageChange,
  currentShow,
  onShowChange = () => {},
  pageCount,
}) {
  const cn = bem('Pagination');

  const getPages = () => {
    const pages = [];
    pages.push(1);

    //Определяем границы видимых страниц вокруг текущей
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(pageCount - 1, currentPage + 1);

    if (currentPage < 3) {
      end = Math.min(3, pageCount - 1);
    } else if (currentPage >= pageCount - 2) {
      start = Math.max(pageCount - 3, 2);
    }

    if (start > 2) {
      pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < pageCount - 1) {
      pages.push('...');
    }

    if (pageCount > 1) {
      pages.push(pageCount);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className={cn()}>
      <div className={cn('box')}>
        {[5, 10, 20].map(count => (
          <button
            key={count}
            type="button"
            className={cn('button', { activeCount: currentShow === count })}
            onClick={() => {
              onShowChange(count);
            }}
          >
            {count}
          </button>
        ))}
      </div>
      <div className={cn('box')}>
        {pages.map((page, index) =>
          page === '...' ? (
            <span key={`el-${index}`} className={cn('span')}>
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              className={cn('button', { active: currentPage === page })}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  currentShow: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onShowChange: PropTypes.func,
};

export default memo(Pagination);
