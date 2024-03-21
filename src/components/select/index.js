import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Select(props) {
  console.log('props', props);

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <select className="Select" value={props.value} onChange={onSelect}>
      {props.options.map((item,i) => (
        <option key={`${item._id}${i}`} value={item.value}>{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func
};

Select.defaultProps = {
  onChange: () => {
  }
}

export default memo(Select);
