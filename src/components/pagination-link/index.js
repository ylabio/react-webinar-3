import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types';
import './style.css';

function PaginationLink({index, onChangePage}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNum = searchParams.get('page');

  return (
    <NavLink className={() => index == pageNum || !pageNum && index == 1 || (index == 1 && pageNum <=0) ? 'Pagination-link Pagination-link-active' : 'Pagination-link'} onClick={() => onChangePage(index)} to={`?page=${index}`}>{index}</NavLink>
  )
}

PaginationLink.propTypes = {
  index: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
}

PaginationLink.defaultProps = {
  onChangePage: () => {}
}

export default React.memo(PaginationLink)