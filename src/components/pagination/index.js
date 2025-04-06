import React from 'react';
import { cn as bem } from '@bem-react/classname';
import 'style.css';

function Pagination({ amount, curPage, limit, onChangePage, onChangeLimit }) {
  const cn = bem('Pagination');
  const lastPage = Math.ceil(amount / limit);

  function generateNumbersOfPages() {
    if (curPage === 1 || curPage === 2) {
      return [1, 2, 3, null, lastPage];
    } else if (curPage === 3) {
      return [1, 2, 3, 4, null, lastPage];
    } else if (lastPage - curPage === 2) {
      return [1, null, curPage - 1, curPage, curPage + 1, lastPage];
    } else if (curPage === lastPage - 1 || curPage === lastPage) {
      return [1, null, lastPage - 2, lastPage - 1, lastPage];
    } else if (curPage - 1 >= 3 || lastPage - curPage >= 3) {
      return [1, null, curPage - 1, curPage, curPage + 1, null, lastPage];
    }
  }

  const numbersOfPages = generateNumbersOfPages();

  function handleChangePage(page) {
    onChangePage(page);
  }

  return (
    <div className={cn()}>
      <div className={cn('limit')}>
        <select className={cn('limit-select')}
          onChange={e => {
            console.log(e.target.value);
            onChangeLimit(e.target.value);
          }}
          defaultValue={limit}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className={cn('pages')}>
        {numbersOfPages.map(el =>
          el ? (
            <button
              className={el === curPage ? cn('button') + ' active' : cn('button')}
              onClick={() => handleChangePage(el)}
            >
              {el}
            </button>
          ) : (
            <span className={cn('span')}>...</span>
          ),
        )}
      </div>
    </div>
  );
}

export default Pagination;
