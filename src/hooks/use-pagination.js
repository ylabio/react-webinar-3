import React from 'react';
import { useMemo } from 'react';

export const DOTS = '...';
const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  export const usePagination = ({
    totalCount,
    limit,
    currentPage = 1,
  }) => {
    const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / limit) || 100;
    const firstPage = 1

      if (totalPageCount <= 4) {
        return range(1, totalPageCount);
      }

      if (currentPage < 3) {
        let leftRange = range(1, 3);
        return [...leftRange, DOTS, totalPageCount];
      }  
      
      if (currentPage < 4) {
        let leftRange = range(1, 4);
        return [...leftRange, DOTS, totalPageCount];
      } 

      if (currentPage === totalPageCount || currentPage === totalPageCount - 1) {
        let rightRange = range(totalPageCount - 3 , totalPageCount);
        return [1, DOTS, ...rightRange];
      }  

 
      const leftSiblingIndex = currentPage - 1;
      const rightSiblingIndex = currentPage + 1;

      return [firstPage, DOTS, leftSiblingIndex, currentPage, rightSiblingIndex, DOTS, totalPageCount];
      

    }, [totalCount, limit, currentPage]);
  
    return paginationRange;
  };
  