import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import PaginationButton from "../pagination-button";
import {getPaginationRange} from "../../utils";
import PropTypes from "prop-types";
import {DEFAULT_PAGINATION} from "../../constants";

const PaginationView = ({ pageSize = DEFAULT_PAGINATION.pageSize,
                          totalPages = DEFAULT_PAGINATION.totalPages,
                          currentPage = DEFAULT_PAGINATION.currentPage,
                          getPageLink = () => {}}) => {

  const cn = bem('PaginationView');

  const pages = getPaginationRange(currentPage, totalPages);

  return (
    <div className={cn()}>
      {pages.map((item, index) =>
        item === 'dots' ? (
          <div key={`dots${index}`} className={cn('separator')}>...</div>
        ) : (
          <PaginationButton
            key={item}
            isCurrentPage={item === currentPage}
            page={item}
            pageSize={pageSize}
            getPageLink={getPageLink}
          />
        )
      )}
    </div>
  );
};

PaginationView.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  getPageLink: PropTypes.func,
};

export default memo(PaginationView);
