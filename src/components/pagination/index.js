import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { getPaginationItems } from '../../utils';
import './style.css';

function Pagination(props) {
  const cn = bem('Pagination');

  const renderPaginationItems = getPaginationItems(
    props.activePage,
    props.pagesCount
  ).map((item, i) =>
    item === 'points' ? (
      <a key={i} className={cn('points')}>
        ...
      </a>
    ) : (
      <a
        key={i}
        onClick={() => props.onChangePage(item)}
        className={cn('link', { active: props.activePage === item })}
      >
        {item}
      </a>
    )
  );

  return <div className={cn()}>{renderPaginationItems}</div>;
}

Pagination.propTypes = {
  pagesCount: PropTypes.number,
  activePage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default memo(Pagination);
