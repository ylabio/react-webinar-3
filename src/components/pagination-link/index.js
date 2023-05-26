import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import PropTypes from 'prop-types';
import './style.css';

function PaginationLink({index, onChangePage}) {
  const {num} = useParams();

  return (
    <NavLink className={({isActive}) => isActive || !num && index == 1 ? 'Pagination-link Pagination-link-active' : 'Pagination-link'} onClick={() => onChangePage(index)} to={`/page/${index}`}>{index}</NavLink>
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