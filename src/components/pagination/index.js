import {memo, useState, useEffect} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination(props) {

  const cn = bem('Pagination');

  const { currentPage, totalItems, changeCurrentPage} = props;

  const pagesCount = Math.ceil(totalItems / 10);

  const pagesArr = [];

  for (let i = currentPage; i < currentPage + 3; i++) {
    if(currentPage === 1) {
      pagesArr.push(currentPage + 1);
      pagesArr.push(currentPage + 2);
      pagesArr.push('...');
      break;
    }

    if(currentPage === pagesCount) {
      pagesArr.push('...');
      pagesArr.push(pagesCount - 2);
      pagesArr.push(pagesCount - 1);
      break;
    }
    pagesArr.push(i - 1);
  }

  const callbacks = {
    onHandleClick: (page) => changeCurrentPage(page)
  }

  return (
    <div className={cn()}>
      <span
      onClick={() => callbacks.onHandleClick(1)}
      className={cn('item') + ' ' + cn(currentPage === 1 ? 'item_active' : 'item')}>
        1
      </span>
      {!!pagesArr.length && pagesArr.map(p =>
        <span
          key={p}
          onClick={() => callbacks.onHandleClick(p)}
          className={cn('item') + ' ' + cn(currentPage === p ? 'item_active' : 'item')}>
            {p}
        </span>
      )}
      <span
      onClick={() => callbacks.onHandleClick(pagesCount)}
      className={cn('item') + ' ' + cn(currentPage === pagesCount ? 'item_active' : 'item')}>
        {pagesCount}
      </span>
    </div>
  );
}

Pagination.propTypes = {
  // item: PropTypes.shape({
  //   _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //   title: PropTypes.string,
  //   price: PropTypes.number
  // }).isRequired,
  // onAdd: PropTypes.func,
};

Pagination.defaultProps = {
  //onAdd: () => {},
}

export default memo(Pagination);
