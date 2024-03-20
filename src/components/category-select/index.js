import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function CategorySelect(props) {

  const onSelect = (e) => {
    props.onChange(e.target.value);
  }

  return (
    <select className="CategorySelect" value={props.value} onChange={onSelect}>
      {props.options.map(item => (
        <option key={item._id} value={item.title}>{item.title}</option>
      ))}
    </select>
  )
}

CategorySelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

CategorySelect.defaultProps = {
  onChange: () => {
  }
}

export default memo(CategorySelect)