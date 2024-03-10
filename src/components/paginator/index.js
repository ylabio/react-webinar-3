import {memo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
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
      { start > 1 && <Link key={1} to={'/?page=1'} className={cn('item', {active: page === 1})}>1</Link> }
      { page > CAPACITY - 1 && <div key={'hellip_start'} className={cn('hellip')}>&hellip;</div> }
      { items.map(item => <Link key={item} to={`/?page=${item}`} className={cn('item', {active: page === item})}>{item}</Link>) }
      { page < pagesCount - CAPACITY + 2 && <div key={'hellip_finish'} className={cn('hellip')}>&hellip;</div> }
      { finish < pagesCount && <Link key={pagesCount} to={`/?page=${pagesCount}`} className={cn('item', {active: page === pagesCount})}>{pagesCount}</Link> }
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