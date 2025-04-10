import { memo, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { pagination } from '../../utils/pagination';
import './style.css';
import { LanguageContext } from '../../store/context';

function Pagination(props) {
  const { translate } = useContext(LanguageContext);
  const paginationRange = useMemo(
    () =>
      pagination({
        totalItems: props.totalItems,
        limit: props.limit ?? 10,
        siblingPages: props.siblingPages ?? 1,
        currentPage: props.currentPage,
      }),
    [props.totalItems, props.limit, props.siblingPages, props.currentPage],
  );

  return (
    <nav className="Navigation" aria-label="pagination">
      <ul className="Pagination">
        {paginationRange?.map((page, i) => {
          if (page === 'dots') {
            return <li key={i}>&#8230;</li>;
          }

          return (
            <li
              key={i}
              onClick={e => {
                e.preventDefault();
                props.onPageChange(page);
              }}
            >
              <a href="" aria-current={props.currentPage === page ? 'page' : undefined}>
                <span className="Visually-hidden">{translate('page')} </span>
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default memo(Pagination);

Pagination.propTypes = {
  totalItems: PropTypes.number,
  limit: PropTypes.number,
  siblingPages: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};
