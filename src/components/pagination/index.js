import { cn as bem } from '@bem-react/classname';
import './style.css';
import getPages from '../../utils';
import PropTypes from 'prop-types';

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  separator = '…',
}) {
  const cn = bem('Pagination');
  const pages = getPages({
    totalPages,
    currentPage,
    separator,
  });

  if (totalPages < 2) return null;

  return (
    <div className={cn()}>
      {pages.map((item, idx) => {
        if (item === separator) {
          return (
            <span className={cn('dots')} key={idx}>
              {item}
            </span>
          );
        }

        return (
          <button
            className={cn('item', { active: item === currentPage })}
            key={idx}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  separator: PropTypes.string,
  onPageChange: PropTypes.func,
};

export default Pagination;
