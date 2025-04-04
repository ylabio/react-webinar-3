import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import './style.css';

function Pagination({count, limit}) {
  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);

  const skip = currentPage !== 1 ? currentPage * limit : 0;
  const lastPage = count % limit === 0 ? count / limit : Math.ceil(count / limit - 1);
  const cn = bem('Pagination');

  useEffect(() => {
    store.actions.catalog.load(limit, skip);
  }, [currentPage, limit]);

  const renderPageButton = (pageNumber, isActive = false) => {
    return (
      <button
        key={pageNumber}
        className={cn('template-button', { 'active': isActive })}
        onClick={() => handleClickButton(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const handleClickButton = (pageNumber) => {
    if (pageNumber === currentPage) return;
    setCurrentPage(pageNumber)
  }

  return (count > 0 &&
    <div className={cn()}>
      {currentPage <= 2 &&
        <div className={cn('template')}>
          {renderPageButton(1, 1 === currentPage)}
          {renderPageButton(2, 2 === currentPage)}
          {renderPageButton(3, 3 === currentPage)}
          <span className={cn('template-separator')}>...</span>
          {renderPageButton(lastPage, lastPage === currentPage)}
        </div>}

      {currentPage === 3 &&
        <div className={cn('template')}>
          {renderPageButton(1, 1 === currentPage)}
          {renderPageButton(2, 2 === currentPage)}
          {renderPageButton(3, 3 === currentPage)}
          {renderPageButton(4, 4 === currentPage)}
          <span className={cn('template-separator')}>...</span>
          {renderPageButton(lastPage, lastPage === currentPage)}
        </div>}

      {currentPage > 3 && currentPage < lastPage - 2 &&
        <div className={cn('template')}>
          {renderPageButton(1, 1 === currentPage)}
          <span className={cn('template-separator')}>...</span>
          {renderPageButton((currentPage - 1), currentPage - 1 === currentPage)}
          {renderPageButton(currentPage, currentPage === currentPage)}
          {renderPageButton((currentPage + 1), currentPage + 1 === currentPage)}
          <span className={cn('template-separator')}>...</span>
          {renderPageButton(lastPage, lastPage === currentPage)}
        </div>}

      {currentPage === lastPage - 2 && lastPage > 5 &&
        <div className={cn('template')}>
          {renderPageButton(1, 1 === currentPage)}
          <span className={cn('template-separator')}>...</span>
          {renderPageButton((lastPage - 3), lastPage - 3 === currentPage)}
          {renderPageButton((lastPage - 2), lastPage - 2 === currentPage)}
          {renderPageButton((lastPage - 1), lastPage - 1 === currentPage)}
          {renderPageButton(lastPage, lastPage === currentPage)}
        </div>}

      {currentPage >= lastPage - 1 && lastPage > 5 &&
        <div className={cn('template')}>
          {renderPageButton(1, 1 === currentPage)}
          <span className={cn('template-separator')}>...</span>
          {renderPageButton((lastPage - 2), lastPage - 2 === currentPage)}
          {renderPageButton((lastPage - 1), lastPage - 1 === currentPage)}
          {renderPageButton(lastPage, lastPage === currentPage)}
        </div>}
    </div>
  );
}

Pagination.propTypes = {
  count: PropTypes.number,
  limit: PropTypes.number,
};

export default memo(Pagination);
