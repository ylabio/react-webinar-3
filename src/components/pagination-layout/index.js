import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {returnPaginationRange} from '../../utils';

function PaginationLayout({pages, activePage, onMousePagination, onSelectPage}) {
  const cn = bem('Pagination');

  function onSelect(page) {
    onSelectPage(page);
  }

  const handleMouseClick = (e, page) => {
    onMousePagination(e, page)
  };

  let array = returnPaginationRange(pages, activePage, 1);

  return (
    <div className={cn()}>
      {array.map(page => {
        return Number(page) ? <a
          className={`${cn('item')} ${activePage === page && cn('active')}`}
          key={page}
          onMouseDown={(e) => handleMouseClick(e, page)}
          onClick={() => onSelect(page)}
        >{page}</a> : <span key={page}>{page}</span>
      })}
    </div>
  );
}

// Pagination.propTypes = {
//   children: PropTypes.node
// }

export default React.memo(PaginationLayout);
