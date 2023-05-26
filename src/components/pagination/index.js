import React, {useState} from 'react';
import {createPages} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({pagesCount, setPagination, pages, pageNow}) {
  const cn = bem('Pagination');

  createPages(pages, pagesCount, pageNow);
  return (
    <div className={cn()}>
      <ul className={cn('wrap')}>
        {pages.map((item) => (
          <li className={cn('item')} key={item.id}>
            <button
              disabled={item.disabled}
              className={pageNow === item.id ? cn('active') : cn('page-link')}
              onClick={() => setPagination(item.number)}
            >
              {item.number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
Pagination.propTypes = {
  pages: PropTypes.array,
  pageNow: PropTypes.number,
  pagesCount: PropTypes.number,
  setPagination: PropTypes.func,
};

Pagination.defaultProps = {
  setPagination: () => {},
};
export default Pagination;
