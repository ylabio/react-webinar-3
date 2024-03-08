import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination(props) {
  const cn = bem('Pagination');
  const {itemsPerPage, totalItems, currentPage, paginate} = props;
  const lastPage = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  if (lastPage < 6) {
    for (let i = 1; i <= lastPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className={cn()}>
        {
          pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? [cn('button'), cn('button_active')].join(' ') : cn('button')}
            >
              {number}
            </button>
          ))
        }
      </div>
    )
  }

  const renderPages = () => {

    if (currentPage === 1) {
      return (
        <>
          <button onClick={() => paginate(currentPage + 1)} className={cn('button')}>{currentPage + 1}</button>
          <button onClick={() => paginate(currentPage + 2)} className={cn('button')}>{currentPage + 2}</button>
          <div className={cn('space')}>...</div>
        </>
      )
    }

    if (currentPage === 2) {
      return (
        <>
          <button onClick={() => paginate(currentPage)} className={[cn('button'), cn('button_active')].join(' ')}>{currentPage}</button>
          <button onClick={() => paginate(currentPage + 1)} className={cn('button')}>{currentPage + 1}</button>
          <div className={cn('space')}>...</div>
        </>
      )
    }

    if (currentPage === 3) {
      return (
        <>
          <button onClick={() => paginate(currentPage - 1)} className={cn('button')}>{currentPage - 1}</button>
          <button onClick={() => paginate(currentPage)} className={[cn('button'), cn('button_active')].join(' ')}>{currentPage}</button>
          <button onClick={() => paginate(currentPage + 1)} className={cn('button')}>{currentPage + 1}</button>
          {
            lastPage >= 6 ?
            <div className={cn('space')}>...</div> :
            <button onClick={() => paginate(currentPage + 2)} className={cn('button')}>{currentPage + 2}</button>
          }
        </>
      )
    }

    if (currentPage === 4) {
      return (
        <>
          {
            lastPage >= 6 ?
            <>
              <div className={cn('space')}>...</div>
              <button onClick={() => paginate(currentPage - 1)} className={cn('button')}>{currentPage - 1}</button>
            </> :
            <button onClick={() => paginate(currentPage - 1)} className={cn('button')}>{currentPage - 1}</button>
          }
          <button onClick={() => paginate(currentPage)} className={[cn('button'), cn('button_active')].join(' ')}>{currentPage}</button>
          {
            lastPage >= 7 ?
            <>
              <button onClick={() => paginate(currentPage + 1)} className={cn('button')}>{currentPage + 1}</button>
              <div className={cn('space')}>...</div>
            </> :
            <button onClick={() => paginate(currentPage + 1)} className={cn('button')}>{currentPage + 1}</button>
          }
        </>
      )
    }

    if (currentPage === lastPage - 2 && lastPage > 6) {
      return (
        <>
          <div className={cn('space')}>...</div>
          <button onClick={() => paginate(currentPage - 1)} className={cn('button')}>{currentPage - 1}</button>
          <button onClick={() => paginate(currentPage)} className={[cn('button'), cn('button_active')].join(' ')}>{currentPage}</button>
          <button onClick={() => paginate(currentPage + 1)} className={cn('button')}>{currentPage + 1}</button>
        </>
      )
    }

    if (currentPage === lastPage - 1) {
      return (
        <>
          <div className={cn('space')}>...</div>
          <button onClick={() => paginate(currentPage - 1)} className={cn('button')}>{currentPage - 1}</button>
          <button onClick={() => paginate(currentPage)} className={[cn('button'), cn('button_active')].join(' ')}>{currentPage}</button>
        </>
      )
    }

    if (currentPage !== lastPage - 1 && currentPage !== lastPage) {
      return (
        <>
          <div className={cn('space')}>...</div>
          <button onClick={() => paginate(currentPage - 1)} className={cn('button')}>{currentPage - 1}</button>
          <button onClick={() => paginate(currentPage)} className={[cn('button'), cn('button_active')].join(' ')}>{currentPage}</button>
          <button onClick={() => paginate(currentPage + 1)} className={cn('button')}>{currentPage + 1}</button>
          <div className={cn('space')}>...</div>
        </>
      )
    }

    if (currentPage === lastPage) {
      return (
        <>
          <div className={cn('space')}>...</div>
          <button onClick={() => paginate(currentPage - 2)} className={cn('button')}>{currentPage - 2}</button>
          <button onClick={() => paginate(currentPage - 1)} className={cn('button')}>{currentPage - 1}</button>
        </>
      )
    }
  };

  return (
    <div className={cn()}>
      <button
        onClick={() => paginate(1)}
        className={currentPage === 1 ? [cn('button'), cn('button_active')].join(' ') : cn('button')}
      >
        1
      </button>
      {renderPages()}
      <button
        onClick={() => paginate(lastPage)}
        className={currentPage === lastPage ? [cn('button'), cn('button_active')].join(' ') : cn('button')}
      >
        {lastPage}
      </button>

    </div>
  );
};

Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  totalItems: PropTypes.number,
  currentPage: PropTypes.number,
  paginate: PropTypes.func
};

Pagination.defaultProps = {
  paginate: () => {}
}

export default memo(Pagination);