import React, {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Select(props) {

  const onSelect = (e) => {
    if(props.value === 'Все') {
      const valueSelect = e.target.value.replace(/-/g, "")
      props.onChange(valueSelect);
    } else {
      props.onChange(e.target.value);
    }
    // props.value === 'Все' && props.resetPage(1)
  };
  return (
    <select className="Select" value={props.value} onChange={onSelect}>
      {props.options.map((item, index) => (
        <option key={index} value={item.value}>{"-".repeat(item.indent) + item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  resetPage: PropTypes.func
};

Select.defaultProps = {
  onChange: () => {},
  resetPage: () => {}
}

export default memo(Select);
