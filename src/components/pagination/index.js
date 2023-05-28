import React from 'react';
import './style.css';
import {createPages} from "../../utils";
import PropTypes from "prop-types";

const Pagination = ({ activePage, pagesCount, onClick }) => {
  const pages = createPages(pagesCount, activePage);

  return (
    <div className={'Pagination'}>
      <div className={'Pagination-buttons'}>
        {pages.map((page, index) => (
          <button
            className={page === activePage ? 'Pagination-button Pagination-button_active' : 'Pagination-button'}
            key={index}
            type={"button"}
            disabled={page === '...'}
            onClick={() => onClick(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  activePage: PropTypes.number,
  pagesCount: PropTypes.number,
  onClick: PropTypes.func,
};

Pagination.defaultProps = {
  onClick: () => {},
};

export default Pagination;