import { memo } from 'react';
import { Link } from 'react-router';
import { generatePaginationArray } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ currentPage, count }) {
  const cn = bem('Pagination');
  const arrPagination = generatePaginationArray(currentPage, count, 10)
  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <div className={cn('limit')}>
          <div className={cn('limit-title')}>Показать на странице</div>
        </div>
        <div className={cn('pages-container')}>
        {arrPagination.map((item) => (
          item > 0 ?
            <Link
              key={item}
              to={`/page/${item}`}
              className={ `${cn('page')}${+item === +currentPage ? ' active' : ''}` }
            >
              { item }
            </Link> :
            <div className={cn('skip')}>
              { '...' }
            </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default memo(Pagination);