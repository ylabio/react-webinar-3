import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { getPageNumbers } from '../../utils';
import { useTranslation } from '../../translation/TranslationContext';

function Pagination({ page, limit, maxCount, setPage = () => {}, setLimit = () => {} }) {
  const { t } = useTranslation();
  const totalPages = Math.ceil(maxCount / limit);

  return (
    <div className="Pagination">
      <div className="Pagination-control">
        <span>{t('itemsPerPage')}: </span>
        <button
          onClick={() => setLimit(5)}
          className={limit === 5 ? 'Pagination-item Pagination-item--active' : 'Pagination-item'}
        >
          5
        </button>
        <button
          onClick={() => setLimit(10)}
          className={limit === 10 ? 'Pagination-item Pagination-item--active' : 'Pagination-item'}
        >
          10
        </button>
        <button
          onClick={() => setLimit(20)}
          className={limit === 20 ? 'Pagination-item Pagination-item--active' : 'Pagination-item'}
        >
          20
        </button>
      </div>
      <div className="Pagination-list">
        {getPageNumbers(page, totalPages).map((item, index) =>
          item === '...' ? (
            <span key={index}>...</span>
          ) : (
            <button
              key={index}
              onClick={() => setPage(item)}
              className={
                page === item ? 'Pagination-item Pagination-item--active' : 'Pagination-item'
              }
            >
              {item}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  limit: PropTypes.number,
  maxCount: PropTypes.number,
  setPage: PropTypes.func,
  setLimit: PropTypes.func,
};

export default memo(Pagination);
