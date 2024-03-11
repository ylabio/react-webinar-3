import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination({currentPage, totalPages, firstPage, lastPage, prevPage, nextPage}) {
  const cn = bem('Pagination');
  return (
    <div className={cn()}>
      {(currentPage !== 1 && currentPage !== 2) && <span className={cn('cell')} onClick={firstPage}>1</span>}
      {currentPage >= 4 && <span className={cn('dots')}>...</span>}
      {currentPage !== 1 && <span className={cn('cell')} onClick={prevPage}>{currentPage - 1}</span>}
      <span className={cn('cell-current')}>{currentPage}</span>
      {(currentPage !== totalPages && currentPage !== totalPages - 1) && <span className={cn('cell')} onClick={() => nextPage(0, 1)}>{currentPage + 1}</span>}
      {currentPage === 1 && <span className={cn('cell')} onClick={() => nextPage(1, 2)}>{currentPage + 2}</span>}
      {currentPage <= totalPages - 3 && <span className={cn('dots')}>...</span>}
      {currentPage !== totalPages && <span className={cn('cell')} onClick={lastPage}>{totalPages}</span>}
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number
};

export default memo(Pagination);
