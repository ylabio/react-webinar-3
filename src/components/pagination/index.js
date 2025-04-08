import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router';
import { generatePaginationArray } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import SelectLimit from '../select-limit';
import { LIMIT_VALUE } from '../../const';
import './style.css';

function Pagination({
  currentPage,
  maxPage,
  limit,
  changeLimit,
  texts,
  setPage,
}) {
  const cn = bem('Pagination');
  const arrPagination = generatePaginationArray(currentPage, maxPage);
  const navigate = useNavigate();
  
  const handlePageClick = useCallback((page) => {
    setPage(page);
    navigate(`/page/${page}`);
  }, [navigate, setPage]);

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <SelectLimit changeLimit={changeLimit} options={LIMIT_VALUE} texts={texts} defaultValue={limit}/>
        <div className={cn('pages-container')}>
        {arrPagination.map((item, index) => (
          item > 0 ?
            <Link
              key={`page-${item}`} 
              to={`/page/${item}`}
              className={ `${cn('page')}${+item === +currentPage ? ' active' : ''}` }
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(item);
              }}
            >
              { item }
            </Link>
            :
            <div
              key={`skip-${index}`}
              className={cn('skip')}
            >
              { '...' }
            </div>
        ))}
        </div>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  maxPage: PropTypes.number.isRequired,
  limit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  changeLimit: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  texts: PropTypes.string.isRequired,
};

export default memo(Pagination);