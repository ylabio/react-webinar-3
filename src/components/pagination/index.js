import React, {useState} from 'react';
import {createPages} from '../../utils';
import './style.css';
function Pagination(props) {
  const pages = [];

  const [pageNow, serPageNow] = useState(0);
  const pagesCount = Math.ceil(props.listCount / 10);

  const setPagination = (page) => {
    let skipPage = 0;
    if (page === 1) {
      skipPage = 0;
    } else if (page > 1 && page < 10) {
      skipPage = page * 10 - 10;
    } else {
      let str = String(page * 10);
      skipPage = str.substring(0, str.length - 1) * 10 - 10;
    }

    serPageNow(page);
    props.paginatePage(skipPage);
  };

  createPages(pages, pagesCount, pageNow);
  return (
    <div className='pagination-wrap'>
      <ul className='pagination'>
        {pages.map((item) => (
          <li className='page-item' key={item.id}>
            <button
              disabled={item.disabled}
              className={pageNow === item.id ? 'active' : 'page-link'}
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
