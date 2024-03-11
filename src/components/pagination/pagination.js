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
    const callbacks = {
        goToPage: useCallback((page) => {
            const newSkip = (page - 1) * limit;
            setSkip(newSkip);
        }, [limit]),
     
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