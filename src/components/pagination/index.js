import { memo } from "react";
// import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ page, count, limit, range, onChange }) {

  const cn = bem('Pagination');

  const totalPages = Math.ceil(count / Math.max(limit, 1));

  let left = Math.max(page - range, 1);
  let right = Math.min(left + range * 2, totalPages);
  left = Math.max(right - range * 2, 1);

  let items = [];


  if (left > 1) items.push(1);
  if (left > 2) items.push(null);
  for (let page = left; page <= right; page++) items.push(page);
  if (right < totalPages - 1) items.push(null);
  if (right < totalPages) items.push(totalPages);

  return (
    <ul className={cn()}>
      {items.map((number, index) => (
        <li key={index}
          className={cn('item', { active: number === page, split: !number })}
          onClick={() => onChange(number)}
        >
          {number || '...'}
        </li>
      ))}
    </ul>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  count: PropTypes.number,
  limit: PropTypes.number,
  range: PropTypes.number,
  onChange: PropTypes.func,
}

Pagination.defaultProps = {
  page: 1,
  count: 1000,
  limit: 10,
  range: 1,
  onChange: () => { },
}

export default memo(Pagination);