import { memo, useState } from "react";
import PropTypes from 'prop-types';
import { renderPageNumbers } from "../../utils";

import './style.css';

function Pagination({ totalPages, onPageChange, currentPage }) {
    function handlePageChange(page) {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    return <div className='Pagination'>{renderPageNumbers(currentPage, totalPages, handlePageChange)}</div>;
}

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    renderPageNumbers: PropTypes.func,
};

Pagination.defaultProps = {
    renderPageNumbers: () => {},
}

export default memo(Pagination);