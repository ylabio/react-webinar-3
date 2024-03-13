import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css';
function Pagination({ limit }) {
    const store = useStore(); 
    const [skip, setSkip] = useState(0); 
    const select = useSelector(state => ({
        currentPage: state.catalog.currentPage,
        lastPage: state.catalog.lastPage
    }));
    useEffect(() => {
        async function fetchData() {
            await store.actions.catalog.load({ limit, skip });
        }
        fetchData();
    }, [skip, store.actions.catalog, limit]);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const pageFromUrl = parseInt(params.get('page') || '1', 10);
        const limitFromUrl = parseInt(params.get('limit') || limit, 10);
        if (pageFromUrl !== select.currentPage || limitFromUrl !== limit) {
            setSkip((pageFromUrl - 1) * limitFromUrl);
        }
    }, [select.currentPage, limit]);
    const setUrlParams = (page, newLimit) => {
        const currentUrl = new URL(window.location);
        const searchParams = currentUrl.searchParams;
        searchParams.set('page', page);
        if (newLimit !== limit) {
            searchParams.set('limit', newLimit);
        } else {
            searchParams.delete('limit');//удаляем если равно базовому
        }
        window.history.pushState({}, '', currentUrl);
    };
    const callbacks = {
        goToPage: useCallback((page) => {
            const newSkip = (page - 1) * limit;
            setSkip(newSkip);
            setUrlParams(page, limit);
        }, [limit]),
        setLimit: useCallback((newLimit) => {
            setSkip(0); 
            setUrlParams(1, newLimit); 
        }, []),
    };
    const delta = 1; //количество страниц рядом с текущей по бокам
    const range = [];

    if (select.lastPage > 1) {
        range.push(1); 

        let startPage, endPage;

        if (select.currentPage <= 3) {
            startPage = 2;
            endPage = 4;
        } else if (select.currentPage > select.lastPage - 3) {
            startPage = select.lastPage - 3;
            endPage = select.lastPage - 1;
        } else {
            startPage = select.currentPage - delta;
            endPage = select.currentPage + delta;
        }

        if (startPage > 2) {
            range.push('...'); 
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i < select.lastPage) {
                range.push(i); 
            }
        }

        if (endPage < select.lastPage - 1) {
            range.push('...'); 
        }

        if (range[range.length - 1] !== select.lastPage) {
            range.push(select.lastPage); 
        }
    }

    const renderPageNumbers = range.map((number, index) => {
        let buttonClass = 'pagination-button';
        if (select.currentPage === number) {
            buttonClass += ' disabled';
        }

        return (
            <button
                key={index} 
                className={buttonClass}
                onClick={() => number !== '...' && callbacks.goToPage(number)}
                disabled={select.currentPage === number || number === '...'}
            >
                {number}
            </button>
        );
    });


    return (
        <div className="pagination-container">
            {renderPageNumbers}
        </div>
    );
}
export default Pagination