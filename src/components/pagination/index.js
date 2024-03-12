import { memo , useEffect} from 'react';
import { useNavigate , useLocation} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalItems, onPageChange }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const cn = bem('Pagination');

    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / 10);
    const showPages = 3; 

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage < showPages - 1) {
        startPage = Math.max(1, endPage - showPages + 1);
    }

    if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...'); 
        pageNumbers.push(totalPages); 
    }

    const handlePageClick = (page) => {
        if (page !== currentPage) {
            onPageChange(page);
            navigate(`?page=${page}`, { replace: true });
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pageParam = parseInt(searchParams.get('page')) || 1;
        if (pageParam !== currentPage) {
            onPageChange(pageParam);
        }
    }, [location.search, currentPage, onPageChange]);


    return (
        <div className={cn()}>
        {pageNumbers.map((page, index) => (
            <div
              key={index}
            //   to={`?page=${page}`}
              className={cn('item', {active: page === currentPage,  dots: page === "..."})}
              onClick={() => handlePageClick(page)}
              >
              {page}
            </div>
        ))}
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default memo(Pagination);
