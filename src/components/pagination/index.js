import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination(props) {
  const cn = bem('Pagination');
  const {itemsPerPage, totalItems, currentPage, paginate, rootLink} = props;
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
            <Link
            to={`${rootLink}${number}`}
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? [cn('button'), cn('button_active')].join(' ') : cn('button')}
            >
              {number}
            </Link>
          ))
        }
      </div>
    )
  }

  const renderPages = () => {

    if (currentPage === 1) {
      return (
        <>
          <Link to={`${rootLink}${currentPage + 1}`} onClick={() => paginate(currentPage + 1)} className={cn('button')}>{currentPage + 1}</Link>
          <Link to={`${rootLink}${currentPage + 2}`} onClick={() => paginate(currentPage + 2)} className={cn('button')}>{currentPage + 2}</Link>
          <div className={cn('space')}>...</div>
        </>
      )
    }

    if (currentPage === 2) {
      return (
        <>
          <Link to={`${rootLink}${currentPage}`} onClick={() => paginate(currentPage)} className={[cn('button'), cn('button_active')].join(' ')}>{currentPage}</Link>
          <Link to={`${rootLink}${currentPage + 1}`} onClick={() => paginate(currentPage + 1)} className={cn('button')}>{currentPage + 1}</Link>
          <div className={cn('space')}>...</div>
        </>
      )
    }

    if (currentPage === 3) {
      return (
        <>
          <Link to={`${rootLink}${currentPage - 1}`} onClick={() => paginate(currentPage - 1)} className={cn('button')}>{currentPage - 1}</Link>
          <Link to={`${rootLink}${currentPage}`} onClick={() => paginate(currentPage)} className={[cn('button'), cn('button_active')].join(' ')}>{currentPage}</Link>
          <Link to={`${rootLink}${currentPage + 1}`} onClick={() => paginate(currentPage + 1)} className={cn('button')}>{currentPage + 1}</Link>
          {
            lastPage >= 6 ?
            <div className={cn('space')}>...</div> :
            <Link to={`${rootLink}${currentPage + 2}`} onClick={() => paginate(currentPage + 2)} className={cn('button')}>{currentPage + 2}</Link>
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
              <Link to={`${rootLink}${currentPage - 1}`} onClick={() => paginate(currentPage - 1)} className={cn('button')}>{currentPage - 1}</Link>
            </> :
            <Link to={`${rootLink}${currentPage - 1}`} onClick={() => paginate(currentPage - 1)} className={cn('button')}>{currentPage - 1}</Link>
          }
          <Link to={`${rootLink}${currentPage}`} onClick={() => paginate(currentPage)} className={[cn('button'), cn('button_active')].join(' ')}>{currentPage}</Link>
          {
            lastPage >= 7 ?
            <>
              <Link to={`${rootLink}${currentPage + 1}`} onClick={() => paginate(currentPage + 1)} className={cn('button')}>{currentPage + 1}</Link>
              <div className={cn('space')}>...</div>
            </> :
            <Link to={`${rootLink}${currentPage + 1}`} onClick={() => paginate(currentPage + 1)} className={cn('button')}>{currentPage + 1}</Link>
          }
        </>
      )
    }

    if (currentPage === lastPage - 2 && lastPage > 6) {
      return (
        <>
          <div className={cn('space')}>...</div>
          <Link to={`${rootLink}${currentPage - 1}`} onClick={() => paginate(currentPage - 1)} className={cn('button')}>{currentPage - 1}</Link>
          <Link to={`${rootLink}${currentPage}`} onClick={() => paginate(currentPage)} className={[cn('button'), cn('button_active')].join(' ')}>{currentPage}</Link>
          <Link to={`${rootLink}${currentPage + 1}`} onClick={() => paginate(currentPage + 1)} className={cn('button')}>{currentPage + 1}</Link>
        </>
      )
    }

    if (currentPage === lastPage - 1) {
      return (
        <>
          <div className={cn('space')}>...</div>
          <Link to={`${rootLink}${currentPage - 1}`} onClick={() => paginate(currentPage - 1)} className={cn('button')}>{currentPage - 1}</Link>
          <Link to={`${rootLink}${currentPage}`} onClick={() => paginate(currentPage)} className={[cn('button'), cn('button_active')].join(' ')}>{currentPage}</Link>
        </>
      )
    }

    if (currentPage !== lastPage - 1 && currentPage !== lastPage) {
      return (
        <>
          <div className={cn('space')}>...</div>
          <Link to={`${rootLink}${currentPage - 1}`} onClick={() => paginate(currentPage - 1)} className={cn('button')}>{currentPage - 1}</Link>
          <Link to={`${rootLink}${currentPage}`} onClick={() => paginate(currentPage)} className={[cn('button'), cn('button_active')].join(' ')}>{currentPage}</Link>
          <Link to={`${rootLink}${currentPage + 1}`} onClick={() => paginate(currentPage + 1)} className={cn('button')}>{currentPage + 1}</Link>
          <div className={cn('space')}>...</div>
        </>
      )
    }

    if (currentPage === lastPage) {
      return (
        <>
          <div className={cn('space')}>...</div>
          <Link to={`${rootLink}${currentPage - 2}`} onClick={() => paginate(currentPage - 2)} className={cn('button')}>{currentPage - 2}</Link>
          <Link to={`${rootLink}${currentPage - 1}`} onClick={() => paginate(currentPage - 1)} className={cn('button')}>{currentPage - 1}</Link>
        </>
      )
    }
  };

  return (
    <div className={cn()}>
      <Link
        to={`${rootLink}1`}
        onClick={() => paginate(1)}
        className={currentPage === 1 ? [cn('button'), cn('button_active')].join(' ') : cn('button')}
      >
        1
      </Link>
      {renderPages()}
      <Link
        to={`${rootLink}${lastPage}`}
        onClick={() => paginate(lastPage)}
        className={currentPage === lastPage ? [cn('button'), cn('button_active')].join(' ') : cn('button')}
      >
        {lastPage}
      </Link>

    </div>
  );
};

Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  totalItems: PropTypes.number,
  currentPage: PropTypes.number,
  paginate: PropTypes.func,
  rootLink: PropTypes.string
};

Pagination.defaultProps = {
  paginate: () => {}
}

export default memo(Pagination);