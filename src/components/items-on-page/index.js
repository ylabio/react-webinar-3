import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ItemsOnPage({ limit, onLimitChange }) {
  return (
    <div className="items-on-page">
      <select value={limit} onChange={e => onLimitChange(Number(e.target.value))}>
        {[5, 10, 20].map(size => (
          <option key={size} value={size}>
            {size} товаров на странице
          </option>
        ))}
      </select>
    </div>
  );
}

ItemsOnPage.propTypes = {
  limit: PropTypes.number.isRequired,
  onLimitChange: PropTypes.func.isRequired,
};

export default memo(ItemsOnPage);
