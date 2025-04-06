import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from "react-router";
import PropTypes from "prop-types";

function PaginationButton({isCurrentPage = false, page, pageSize, getPageLink}) {

  const cn = bem('PaginationButton');

  const link = getPageLink(page, pageSize);

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
