import React, { useCallback, useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import Pagination from '../pagination';
import PaginationSwitcher from '../pagination-switcher';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';

function PaginationTool ({currentPage = 1, limit = 10, count = 0, onPageChange = ()=>{}, onChangeLimit = ()=>{} }) {
  const cn = bem('PaginationTool');

  return (
    <div className={cn()}>
      <PaginationSwitcher changeCount={onChangeLimit}/>
      <Pagination
        currentPage={currentPage}
        count={count}
        limit={limit}
        onPageChange={onPageChange}    
      />
    </div>
  );
};

PaginationTool.propTypes = {
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  count: PropTypes.number,
  onChangeLimit: PropTypes.func,
  onPageChange: PropTypes.func,
};

export default PaginationTool;
