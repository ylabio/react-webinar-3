import PropTypes from 'prop-types';
import { useMemo, useState, memo, useEffect, useRef } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PaginationControl({ pagination = () => {}, count = 0, limit = 0 }) {
  const [page, setPage] = useState(1);
  const isFirstRender = useRef(true);

  const pageCount = useMemo(() => Math.ceil(count / limit), [limit, count]);

  const cn = bem('PaginationControl');

  const onPageClick = e => {
    const nextPage = +e.target.textContent;

    if (isNaN(nextPage) || page === nextPage) return;

    pagination(limit, nextPage * limit - limit);

    setPage(nextPage);
  };

  useEffect(() => {
    //Пропускаем первый рендер так как есть initState в каталоге
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    //При изменении лимита переходим на первую страницу и подгружаем новый список
    pagination(limit, 0);
    setPage(1);
  }, [limit]);

  return (
    <div className={cn()} onClick={onPageClick}>
      <div className={cn(`${page === 1 ? 'page active' : 'page'}`)}>1</div>

      {page > 3 && <div className={cn('page')}>...</div>}

      {page === pageCount && <div className={cn('page')}>{pageCount - 2}</div>}

      {page > 2 && <div className={cn('page')}>{page - 1}</div>}

      {page > 1 && <div className={cn(`${page > 1 ? 'page active' : 'page'}`)}>{page}</div>}

      {page < pageCount - 1 && <div className={cn('page')}>{page + 1}</div>}

      {page === 1 && <div className={cn('page')}>3</div>}

      {page < pageCount - 2 && <div className={cn('page')}>...</div>}

      {page < pageCount && <div className={cn('page')}>{pageCount}</div>}
    </div>
  );
}

PaginationControl.propTypes = {
  pagination: PropTypes.func.isRequired,
  count: PropTypes.number,
  limit: PropTypes.number,
};

export default memo(PaginationControl);
