import { memo } from 'react';
import { Link } from 'react-router';
import { generatePaginationArray } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import SelectLimit from '../select-limit';
import './style.css';

// ?TODO: [REFACTOR] Разделить Pagination на меньшие компоненты
function Pagination({ currentPage, count, limit, changeLimit }) {
  const cn = bem('Pagination');
  const arrPagination = generatePaginationArray(currentPage, count, limit);

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <SelectLimit changeLimit={changeLimit}/>
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

export default memo(Pagination);