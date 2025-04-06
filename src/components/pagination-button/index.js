import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from "react-router";
import PropTypes from "prop-types";

function PaginationButton({isCurrentPage = false, page, pageSize}) {

  const cn = bem('PaginationButton');

  const newParams = new URLSearchParams();
  newParams.set('page', page);
  newParams.set('pageSize', pageSize);

  const link = `?${newParams.toString()}`

  return (
    <Link to={link} className={cn({currentPage: isCurrentPage})}>
      {page}
    </Link>
  );
}

PaginationButton.propTypes = {
  isCurrentPage: PropTypes.bool,
  page: PropTypes.number,
  pageSize: PropTypes.number,
};


export default memo(PaginationButton);
