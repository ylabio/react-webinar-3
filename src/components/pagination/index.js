import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useTranslation } from '../../translation/use-translation';

function Pagination({
  total,
  currentPage,
  itemsPerPage,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
}) {
  const cn = bem('Pagination');
  const { t } = useTranslation();
  const totalPages = Math.ceil(total / itemsPerPage);

  const renderPageNumbers = () => {
    const pages = [];

    if (currentPage === 1) {
      pages.push(
        <button
          key={1}
          className={cn('page', { active: true, plain: false })}
          onClick={() => onPageChange(1)}
        >
          1
        </button>,
      );

      if (totalPages > 1) {
        pages.push(
          ...Array.from({ length: Math.min(2, totalPages - 1) }, (_, i) => i + 2).map(page => (
            <button
              key={page}
              className={cn('page', { active: false, plain: true })}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )),
        );

        if (totalPages > 3) {
          pages.push(
            <span key="dots-end" className={cn('dots')}>
              ...
            </span>,
          );
        }
      }
    } else {
      pages.push(
        <button
          key={1}
          className={cn('page', { active: false, plain: true })}
          onClick={() => onPageChange(1)}
        >
          1
        </button>,
      );

      if (currentPage > 3) {
        pages.push(
          <span key="dots-start" className={cn('dots')}>
            ...
          </span>,
        );
      }

      const prevPage = currentPage - 1;
      const nextPage = currentPage + 1;

      if (prevPage > 1) {
        pages.push(
          <button
            key={prevPage}
            className={cn('page', { active: false, plain: true })}
            onClick={() => onPageChange(prevPage)}
          >
            {prevPage}
          </button>,
        );
      }

      pages.push(
        <button
          key={currentPage}
          className={cn('page', { active: true, plain: false })}
          onClick={() => onPageChange(currentPage)}
        >
          {currentPage}
        </button>,
      );

      if (nextPage < totalPages) {
        pages.push(
          <button
            key={nextPage}
            className={cn('page', { active: false, plain: true })}
            onClick={() => onPageChange(nextPage)}
          >
            {nextPage}
          </button>,
        );
      }

      if (nextPage < totalPages - 1) {
        pages.push(
          <span key="dots-end" className={cn('dots')}>
            ...
          </span>,
        );
      }
    }

    if (totalPages > 1 && currentPage !== totalPages) {
      pages.push(
        <button
          key={totalPages}
          className={cn('page', { active: false, plain: true })}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>,
      );
    }

    return pages;
  };

  return (
    <div className={cn()}>
      <div className={cn('perPage')}>
        <select
          value={itemsPerPage}
          onChange={e => onItemsPerPageChange(Number(e.target.value))}
          className={cn('select')}
        >
          {itemsPerPageOptions.map(value => (
            <option key={value} value={value}>
              {value} {t('itemsPerPage')}
            </option>
          ))}
        </select>
      </div>

      <div className={cn('pages')}>{renderPageNumbers()}</div>
    </div>
  );
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  onPageChange: PropTypes.func.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
};

export default memo(Pagination);
