import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

function Paginator ({itemsLimit, pagesCount, activePage, skip, setSkip}) {

  const cn = bem('Paginator');

  let pages = [];
  const currentPage = activePage;
  let previousPage = currentPage - 1;
  let nextPage = currentPage + 1;

  for(let i = 0; i < pagesCount; i++) {
    pages.push(i + 1);
  }

  return (
    <div className={cn()}>
      {currentPage >= 3 && (
        <div className={skip === 0 ? cn('button-active') : cn('button')}
             onClick={() => setSkip(0)}>{pages[0]}
        </div>
      )}
      {previousPage > 2 && (
        <div className={cn('dots')}>...</div>
      )}
      {currentPage === pagesCount && (
        <div className={cn('button')}
             onClick={() => setSkip((currentPage - 3) * itemsLimit)}>
          {currentPage - 2}
        </div>
      )}
      {previousPage > 0 && (
        <div className={cn('button')}
             onClick={() => setSkip((previousPage - 1) * itemsLimit)}>
          {previousPage}
        </div>
      )}
      {currentPage !== pagesCount && (
        <div className={skip / itemsLimit + 1 === currentPage ? cn('button-active') : cn('button')}
        onClick={() => setSkip((currentPage - 1) * itemsLimit)}>
      {currentPage}
        </div>
        )}
      {nextPage < pagesCount && (
        <div className={cn('button')}
             onClick={() => setSkip((nextPage - 1) * itemsLimit)}>
          {nextPage}
        </div>
      )}
      {currentPage <= 1 && (
        <div className={cn('button')}
             onClick={() => setSkip((pages[2] - 1) * itemsLimit)}>
          {pages[2]}
        </div>
      )}

      {nextPage < pagesCount - 1 && (
        <div className={cn('dots')}>...</div>
      )}
      <div className={skip === (pagesCount * itemsLimit) - itemsLimit ? cn('button-active') : cn('button')}
           onClick={() => setSkip((pagesCount * itemsLimit) - itemsLimit)}>
        {pagesCount}
      </div>
    </div>
  );
}

Paginator.propTypes = {
  itemsLimit: PropTypes.number,
  itemsCount: PropTypes.number,
  skip: PropTypes.number,
  setSkip: PropTypes.func
};

export default Paginator;