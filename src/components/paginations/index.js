import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { getArrPages } from '../../utils'
import './style.css';

function Paginations({ totalArticlesCount, limit, currentPage, onClickPagination }) {
  const cn = bem('Paginations');
  let pages = getArrPages(totalArticlesCount, limit, currentPage);

  return (
    <div className={cn()}>
      {pages
        .map((page, index) => {
          return (typeof page) === 'number'
            ? <div key={index} onClick={(e) => { onClickPagination(page) }}
              className={page === currentPage ? cn('item', { selected: true }) : cn('item')}
            >{page}</div>
            : <div key={index} className={cn('item-dots')}>{page}</div>
        })}
    </div>
  )
}

Paginations.propTypes = {
  onClickPagination: PropTypes.func,
  totalArticlesCount: PropTypes.number,
  limit: PropTypes.number,
  currentPage: PropTypes.number
};

Paginations.defaultProps = {
  onClickPagination: (page) => { },
  limit: 10,
  currentPage: 1
}

export default memo(Paginations);
