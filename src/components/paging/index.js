import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Paging({changePage, setupLimit, dataPaging}) {
  const { page, limit, avail } = dataPaging;

  const cn = bem('Paging');

  const getPages = (page) => {
    const endpg = Math.trunc(avail / limit) + (avail % limit && 1);
      if (page < 3) return [1, 2, 3, 0, endpg];
      if (page === 3) return [1, 2, 3, 4, 0, endpg];
      if (page > (endpg - 2)) return [1, 0, endpg - 2, endpg - 1, endpg];
      if (page === (endpg - 2)) return [1, 0, endpg - 3, endpg - 2, endpg - 1, endpg];
    return [1, 0, page - 1, page, page + 1, 0, endpg];
  };

  return (
    <div className={cn()}>
      <div className={cn('limit')}>
        Отображать:
        <div className={cn('select')} >
          <select value={limit} onChange={(event) => {
            const newlim = +event.target.value;
            event.stopPropagation();
            setupLimit(newlim);
            changePage(1);
            }
          }>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <div className={cn('title')}>
        Страницы:
        <div className={cn('pages')}>
          {getPages(page).map((item, indx) => {
            if (item && item === page) {
              return (<div key={indx} className={cn('item', { show: 'current'})}>{item}</div>);
            } else if (item && item !== page) {
              return (<div key={indx} className={cn('item', { show: 'active'})} onClick={() => changePage(item)}>{item}</div>);
            } else {
              return (<div key={indx} className={cn('item', { show: 'space'})}>. . .</div>);
            }
          })}
        </div>
      </div>
    </div>
  )
}

Paging.propTypes = {
  changePage: PropTypes.func.isRequired,
  setupLimit: PropTypes.func.isRequired,
  dataPaging: PropTypes.shape({
    page: PropTypes.number,
    limit: PropTypes.number,
    avail: PropTypes.number
  }),
};

Paging.defaultProps = {
  changePage: () => {},
  setupLimit: () => {},
  dataPaging: {
    page: 1,
    limit: 10,
    avail: 542,
  },
}

export default memo(Paging);
