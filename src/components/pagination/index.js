import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Pagination({pages, renderPagination}){
  return (
    <div className='Pagination'>
      { pages.map(page => <div key={page}>{ renderPagination(page) }</div>) }
    </div>
  )
}

Pagination.propTypes = {
  pages: PropTypes.arrayOf(Number),
  renderPagination: PropTypes.func,
};

Pagination.defaultProps = {
  pages: [1],
  renderPagination: () => {},
}

export default memo(Pagination);
