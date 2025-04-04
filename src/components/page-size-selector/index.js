import { memo, useRef } from 'react';
import './style.css';

const options = [5, 10, 20];

function PageSizeSelector(props) {
  return (
    <div className="Wrap">
      <label>
        <b>Товаров на странице:</b>
      </label>
      <select
        className="Select"
        onChange={e => props.onPageChange(e.target.value)}
        defaultValue={props.defaultValue}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default memo(PageSizeSelector);
