import React, { memo, useMemo } from 'react';
import { pagination, DOTS } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Select from '../select';
import PropTypes from 'prop-types';

const Pagination = ({
  onPageChange = () => {},
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  propSelect,
  changeSelect = () => {},
}) => {
  const cn = bem('Panigation');

  const paginationRange = useMemo(
    () => pagination({ currentPage, totalCount, siblingCount, pageSize }),
    [currentPage, totalCount, siblingCount, pageSize],
  );

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <>
      <ul className={cn()}>
        <Select
          className={cn('select')}
          changeSelect={changeSelect}
          value={pageSize}
          propSelect={propSelect}
        />
        {paginationRange.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <li key={i + pageNumber} className={cn('item-dots')}>
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={pageNumber}
              className={cn('item', {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
      </ul>
    </>
  );
};

Pagination.propTypes = {
  onPageChange: PropTypes.func,
  totalCount: PropTypes.number,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  changeSelect: PropTypes.func,
};

export default memo(Pagination);
