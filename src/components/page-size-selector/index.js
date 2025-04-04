import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Selector(props) {
  return (
    <div className="Wrap">
      <label>
        <b>{props.label}</b>
      </label>
      <select
        className="Select"
        onChange={e => props.onChange(e.target.value)}
        defaultValue={props.defaultValue}
      >
        {props.options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default memo(Selector);

Selector.protoTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
};
