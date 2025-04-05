import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { useTranslate } from "../../locales/use-translate";

function Pagination({ totalPages, page, limit, onChange }) {
    const [currentPage, setCurrentPage] = useState(page);
    const [itemsPerPage, setItemsPerPage] = useState(limit);
    const t = useTranslate();

    useEffect(() => {
        onChange({ page: currentPage, limit: itemsPerPage });
    }, [currentPage, itemsPerPage, onChange]);

    const handlePageClick = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    const handleLimitChange = useCallback((e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Сбрасываем страницу при изменении лимита
    }, []);

    const pages = useMemo(() => {
        const visiblePages = currentPage === 1 ? 2 : 1;
        const result = [];

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - visiblePages && i <= currentPage + visiblePages)
            ) {
                result.push(
                    <button
                        key={i}
                        className={`Pagination-page ${i === currentPage ? "Pagination-page-selected" : ""}`}
                        onClick={() => handlePageClick(i)}
                    >
                        {i}
                    </button>
                );
            } else if (
                i === currentPage - visiblePages - 1 ||
                i === currentPage + visiblePages + 1
            ) {
                result.push(<span key={i} className="Pagination-page">...</span>);
            }
        }
        return result;
    }, [totalPages, currentPage, handlePageClick]);

    return (
        <div className="Pagination">
            <div className="Pagination-selector">
                <span>{t.show}: </span>
                <select className="Pagination-select" value={itemsPerPage} onChange={handleLimitChange}>
                    {[5, 10, 20].map(size => (
                        <option key={size} value={size}>{size} {t.itemsPerPage}</option>
                    ))}
                </select>
            </div>

            <div className="Pagination-pages">{pages}</div>
        </div>
    );
}

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default React.memo(Pagination);