import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function SelectCategory(props) {

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

 

  return (
    <select className="Select" value={props.value} onChange={onSelect}>
      {props.categories.map(item => (
        <option key={item._id} value={item._id}>{item.parent != null ? ' - ' : ''}{item.title}</option>
      ))}
    </select>
  )
}

SelectCategory.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    parent: PropTypes.any,
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

SelectCategory.defaultProps = {
  onChange: () => {
  }
}

export default memo(SelectCategory);
