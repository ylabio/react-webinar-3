import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import useStore from "../../store/use-store";
function Pagination({ limit, currentPage, lastPage }) {
    const store = useStore(); 
    const [skip, setSkip] = useState(0); 
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
        if (pageFromUrl !== currentPage || limitFromUrl !== limit) {
            setSkip((pageFromUrl - 1) * limitFromUrl);
        }
    }, [currentPage, limit]);
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

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(lastPage - 1, currentPage + delta); i++) {
        range.push(i);
    }

    if (currentPage - delta > 2) {
        range.unshift('...');
    }

    if (currentPage + delta < lastPage - 1) {
        range.push('...');
    }

    range.unshift(1);
    if (lastPage !== 1) { 
        range.push(lastPage);
    }

    const renderPageNumbers = range.map((number, index) => {
        if (number === '...') {
            return <span key={number + index}>...</span>;
        } else {
            
            return (
                <button
                    key={number}
                    onClick={() => callbacks.goToPage(number)}
                    disabled={currentPage === number}
                >
                    {number}
                </button>
            );
        }
    });

    return (
        <div>
          
            {renderPageNumbers}
            
        </div>
    );
}
export default Pagination