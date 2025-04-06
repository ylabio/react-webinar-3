import { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import { getFormatPages } from '../../utils';
import { cn as bem } from '@bem-react/classname';

function Pagination({ pageInfo, onChangePage = () => {}, onChangeLimit = () => {}}) {
  const cn = bem('Pagination');
  const { currentPage, limit, totalPages, availableLimits } = pageInfo;
  return (
    <div className={cn()}>
      <div className={cn('limit')}>
        <h4>Количество записей на странице:</h4>
        <div className={cn('radio')}>
          {availableLimits.map((currentLimit, index) => (
            <label className={cn('radio-label')} key={index}>
              <input
                type="radio"
                value={currentLimit}
                checked={limit === currentLimit}
                onChange={(e) => onChangeLimit(Number(e.target.value))}
              />
            {currentLimit}
            </label>
          ))}
        </div>
      </div>
      <ul className={cn('list')}>
        {getFormatPages(totalPages, currentPage).map((page, index) => {
          return (
            <li key={index}>
              <Button onClick={() => onChangePage(page)} style={currentPage === page ? 'page-current' : 'page'} title={page.toString()} disabled={page === "..."}/>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

Pagination.PropTypes = {
  pageInfo: PropTypes.shape ({
    currentPage: PropTypes.number,
    limit: PropTypes.number,
    totalPages: PropTypes.number,
    availableLimits: PropTypes.arrayOf(PropTypes.number),
  }),
  onChangePage: PropTypes.func,
  onChangeLimit: PropTypes.func,
}


export default memo(Pagination);
