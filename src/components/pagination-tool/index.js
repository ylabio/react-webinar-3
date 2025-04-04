import React, { useCallback, useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import Pagination from '../pagination';
import PaginationSwitcher from '../pagination-switcher';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';

function PaginationTool () {
  const store = useStore();
  const { currentPage, limit } = useSelector(state => state.pagination);
  const { count } = useSelector(state => state.catalog);

  const callbacks = {
    onPageChange: useCallback(page => store.actions.pagination.onPageChange(page), [store]),
    onChangeLimit: useCallback(limit => store.actions.pagination.onChangeLimit(limit), [store]),
  };
  const cn = bem('PaginationTool');

  const last = 25;
  return (
    <div className={cn()}>
      <PaginationSwitcher changeCount={callbacks.onChangeLimit}/>
      <Pagination
        currentPage={currentPage}
        count={count}
        limit={limit}
        onPageChange={callbacks.onPageChange}    
      />
    </div>
  );
};

export default PaginationTool;
