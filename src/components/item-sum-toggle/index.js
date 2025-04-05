import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemSumToggle({ onItemSumChange }) {
  const cn = bem('ItemSumToggle');

  const handleChange = (event) => {
    onItemSumChange(Number(event.target.value));
  };

  return (
    <div className={cn()}>
      <select onChange={handleChange} defaultValue="5">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}

ItemSumToggle.propTypes = {
  onItemSumChange: PropTypes.func.isRequired,
};

export default memo(ItemSumToggle);
