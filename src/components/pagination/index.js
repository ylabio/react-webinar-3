import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import locales from '../../locales';

function Pagination({
  language = 'ru',
  setCurrentPage,
  countPage,
  currentPage,
  limit = null,
  setLimit = () => {},
}) {
  const maxVisiblePages = 3;
  const cn = bem('Pagination');

  const getVisiblePages = () => {
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > countPage) {
      endPage = countPage;
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={cn()}>
      {limit && (
        <div className={cn('Limit')}>
          <span>{locales[language].showBy}</span>
          {[5, 10, 20].map(value => (
            <button
              key={value}
              onClick={() => setLimit(value)}
              className={cn('button', { active: limit === value })}
              aria-label={`Показать ${value} элементов на странице`}
            >
              <span className={cn('Text')}>{value}</span>
            </button>
          ))}
        </div>
      )}

      {currentPage > 1 && visiblePages[0] !== 1 && (
        <button onClick={() => setCurrentPage(1)} className={cn('button')}>
          <span className={cn('Text')}>{1}</span>
        </button>
      )}

      {visiblePages[0] > 2 && <span className={cn('dots')}>...</span>}

      {visiblePages.map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={cn('button', { active: currentPage === page })}
        >
          <span className={cn('Text')}>{page}</span>
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < countPage - 1 && (
        <span className={cn('dots')}>...</span>
      )}

      {currentPage < countPage && visiblePages[visiblePages.length - 1] !== countPage && (
        <button onClick={() => setCurrentPage(countPage)} className={cn('button')}>
          <span className={cn('Text')}>{countPage}</span>
        </button>
      )}
    </div>
  );
}

Pagination.propTypes = {};

export default memo(Pagination);
