import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { generatePaginationArray } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import SelectLimit from '../select-limit';
import { LIMIT_VALUE } from '../../const';
import './style.css';

function Pagination({ currentPage, count, limit, changeLimit }) {
  const cn = bem('Pagination');
  const arrPagination = generatePaginationArray(currentPage, count, limit);

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <SelectLimit changeLimit={changeLimit} options={LIMIT_VALUE}/>
        <div className={cn('pages-container')}>
        {arrPagination.map((item, index) => (
          item > 0 ?
            <Link
              key={`page-${item}`} 
              to={`/page/${item}`}
              className={ `${cn('page')}${+item === +currentPage ? ' active' : ''}` }
            >
              { item }
            </Link> :
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
    PropTypes.number
  ]).isRequired,
  count: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  changeLimit: PropTypes.func.isRequired,
};

export default memo(Pagination);