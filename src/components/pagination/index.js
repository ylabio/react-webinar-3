import { Link } from "react-router-dom";
import { memo } from "react";
import PropTypes from "prop-types";
import './style.css';

function Pagination({ pages, page }) {
  let range = [];

  // probably this can be less conditional, need to think about it...
  if (pages < 6) range = Array.from({length: pages}, (v, k) => k + 1);
  else {
    if (page < 3) range = [1, 2, 3, '...', pages];
    else if (page === 3) range = [1, 2, 3, 4, '...', pages];
    else if (page > pages - 2) range = [1, '...', pages - 2, pages - 1, pages];
    else if (page > pages === 2) range = [1, '...', pages - 2, pages - 1, pages];
    else range = [1, '...', page - 1, page, page +1, '...', pages];
  }
  if (page > pages) page = 1;

  const selectorElem = (el, ind) => {
    if (typeof el === 'string') return <div className='Pagination-spacer' key={ 'spc' + ind }>{ el }</div>
    if (el === page) return <div className='Pagination-selector--selected' key={ el }>{ el }</div>
    return <Link to={ `/${el}` } key={ el } className='Pagination-selector'>{ el }</Link>
  }

  return (
    <div className='Pagination'>
      { (pages > 1) && range.map((el, ind) => selectorElem(el, ind)) }
    </div>
  );
}

Pagination.propTypes = {
  pages: PropTypes.number,
  page: PropTypes.number,
};

Pagination.defaultProps = {
  pages: 1,
  page: 1,
}

export default memo(Pagination);
