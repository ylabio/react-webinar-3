import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ loadItems, count, limit }) {

  const cn = bem('Pagination');
  const [page, setPage] = useState(1)
  const length = Math.ceil(count / limit)
  const pages = []
  const intervalLit = '...'
  for (let i = 1; i <= length; i++) {
    pages.push(i)
  }
  useEffect(() => {
    loadItems(page)
  }, [page])
  const createPagesList = (page, pages) => {
    const start = pages[0]
    const end = pages[pages.length - 1]
    const count = 3
    if (page <= start + 2) {
      return [start, ...pages.slice(Math.max(start, page - 2), Math.max(count, page + 1)), intervalLit, end]
    }
    else if (page >= end - 2) {
      return [start, intervalLit, ...pages.slice(Math.min(page - 2, end - count), end)]
    }
    return [start, intervalLit, ...pages.slice(page - 2, page + 1), intervalLit, end]
  }
  return (
    <div className={cn()}>
      {createPagesList(page, pages).map((p, i) => <span
        key={i}
        onClick={() => p !== intervalLit && setPage(p)}
        className={cn('page', {
          ['active']: page === p,
          ['interval']: p === intervalLit
        })}
      >{p}</span>)}
    </div>
  );
}

Pagination.propTypes = {
  count: PropTypes.number,
  limit: PropTypes.number,
  loadItems: PropTypes.func,
};

Pagination.defaultProps = {
  loadItems: () => { },
}

export default memo(Pagination);
