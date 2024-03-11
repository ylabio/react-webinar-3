import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { createPagesList } from "../../utils";

function Pagination({ loadItems, count, limit }) {

  const cn = bem('Pagination');
  const [page, setPage] = useState(1)
  const length = Math.ceil(count / limit)
  const pages = []
  const intervalLit = '...'
  for (let i = 1; i <= length; i++) {
    pages.push(i)
  }
  const onChangePage = (e, p) => {
    e.preventDefault()
    setPage(p)
    loadItems(p)
  }

  return (
    <div className={cn()}>
      {createPagesList(page, pages, intervalLit).map((p, i) => <span
        key={i}
        onClick={(e) => p !== intervalLit && onChangePage(e, p)}
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
