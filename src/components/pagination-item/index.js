import { memo } from 'react';
import './style.css';
import PropTypes from 'prop-types';

function PaginationItem({ onClick, isActive, item }) {
  const className = `PaginationItem ${isActive && 'PaginationItem__active'}`

  return (
    <div role="button" tabIndex="0" onClick={onClick} className={className}>
      {item}
    </div>
  );
}

PaginationItem.propTypes = {
  id: PropTypes.number,
  item: PropTypes.oneOfType([
    PropTypes.string, // может быть строка '...'
    PropTypes.number,
  ]),
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(PaginationItem);
