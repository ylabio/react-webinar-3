import React, { useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import Pagination from '../pagination';
import PaginationSwitcher from '../pagination-switcher';

function PaginationTool ({ count = 10 }) {
  

  const cn = bem('PaginationTool');

  const last = 25;
  return (
    <div className={cn()}>
      <PaginationSwitcher changeCount={()=>{}}/>
      <Pagination currentPage={4} totalPages={25} onPageChange={()=>{}} />
    </div>
  );
};

PaginationTool.propTypes = {
  count: PropTypes.number,
};

export default PaginationTool;
