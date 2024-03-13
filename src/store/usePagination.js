import { useState, useCallback, useEffect } from 'react';

function usePagination(initialLimit, actions, urlKey = 'page') {
    const [limit, setLimit] = useState(initialLimit);
    const [skip, setSkip] = useState(0);
    const [isInitialUpdate, setIsInitialUpdate] = useState(true);

    const setUrlParams = useCallback((page, newLimit) => {
        const currentUrl = new URL(window.location);
        const searchParams = currentUrl.searchParams;
        searchParams.set(urlKey, page);
        if (newLimit !== initialLimit) {
            searchParams.set('limit', newLimit);
        } else {
            searchParams.delete('limit');
        }
        window.history.pushState({}, '', currentUrl);
    }, [initialLimit, urlKey]);

    const updatePagination = useCallback(() => {
        const params = new URLSearchParams(window.location.search);
        const pageFromUrl = parseInt(params.get(urlKey) || '1', 10);
        const limitFromUrl = parseInt(params.get('limit') || limit, 10);
        setLimit(limitFromUrl);
        setSkip((pageFromUrl - 1) * limitFromUrl);
        setIsInitialUpdate(false); 
    }, [ urlKey]);

    useEffect(() => {
        updatePagination();
    }, []);

    useEffect(() => {
        if (!isInitialUpdate) {
            actions.load({ limit, skip });
        }
    }, [skip, actions, limit, isInitialUpdate]);

    const goToPage = useCallback((page) => {
        const newSkip = (page - 1) * limit;
        setSkip(newSkip);
        setUrlParams(page, limit);
    }, [limit, setUrlParams]);

    return { limit, skip, goToPage };
}

export default usePagination;