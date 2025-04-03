import React, { useState, useCallback } from 'react';
import './style.css';

import Pagination from '../pagination';
import CountSwitcher from '../count-switcher';

import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

const PageTools = () => {
    const store = useStore();

    const { catalog } = store.actions;
    const { currentPage, limit, totalPages } = useSelector(state => ({
        currentPage: state.catalog.currentPage,
        limit: state.catalog.limit,
        totalPages: state.catalog.totalPages,
    }));

    const callbacks = {
        // Изменение текущей страницы
        changePage: useCallback(newPage => catalog.setPage(newPage), [catalog]),
        // Изменение количества отображаемых товаров
        changeCountDisplayItems: useCallback(e => catalog.setLimit(parseInt(e.target.value, 10)), [catalog]),
    };

    return (
        <div className='Page-tools'>
            <CountSwitcher
                countDisplayItems={limit}
                handleSelectChange={callbacks.changeCountDisplayItems}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={callbacks.changePage}
            />
        </div>
    )
}

export default React.memo(PageTools);