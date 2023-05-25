import React, {useState} from 'react';
import {createPages} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination(props) {
  const cn = bem('Pagination');
  const pages = [];

  const [pageNow, serPageNow] = useState(1);
  const numberOfProducts = 10;
  const pagesCount = Math.ceil(props.listCount / numberOfProducts);

  const setPagination = (page) => {
    let skipPage = 0;
    if (page === 1) {
      skipPage = 0;
    } else if (page > 1 && page < numberOfProducts) {
      skipPage = page * numberOfProducts - numberOfProducts;
    } else {
      let str = String(page * numberOfProducts);
      skipPage =
        str.substring(0, str.length - 1) * numberOfProducts - numberOfProducts;
    }

    serPageNow(page);
    props.paginatePage(skipPage);
  };

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

export default Pagination;
