import {memo} from 'react';
import PropTypes from 'prop-types';
import ItemPaginator from './item-paginator';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Paginator({onSetPage, pagesCount, page}) {
  const cn = bem('Paginator');

  // Количество ссылок в средней группе
  const CAPACITY = 3;

  let start = page - Math.floor(CAPACITY / 2) >= 1 ? page - Math.floor(CAPACITY / 2) : 1;
  const finish = start + CAPACITY - 1 <= pagesCount ? start + CAPACITY - 1 : pagesCount;
  if (finish - start < CAPACITY - 1) { start = finish - CAPACITY + 1 > 1 ? finish - CAPACITY + 1 : 1; }
  const items = [...Array(finish - start + 1).keys().map(item => item + start)]
  
  return (
    <div className={cn()}>
      { start > 1 && <ItemPaginator key={1} onSetPage={onSetPage} page={1} isActive={page === 1} /> }
      { page > CAPACITY - 1 && <div key={'hellip_start'} className={cn('hellip')}>&hellip;</div> }
      { items.map(item => <ItemPaginator key={item} onSetPage={onSetPage} page={item} isActive={page === item} />) }
      { page < pagesCount - CAPACITY + 2 && <div key={'hellip_finish'} className={cn('hellip')}>&hellip;</div> }
      { finish < pagesCount && <ItemPaginator key={pagesCount} onSetPage={onSetPage} page={pagesCount} isActive={page === pagesCount} /> }
    </div>
  )
}

Paginator.propTypes = {
  onSetPage: PropTypes.func.isRequired,
  page: PropTypes.number,
  pagesCount: PropTypes.number
};

Paginator.defaultProps = {
  page: 1,
  pagesCount: 0
}

export default memo(Paginator);