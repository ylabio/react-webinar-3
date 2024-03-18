import {memo} from "react";
import './style.css';
import PropTypes from 'prop-types';

function SelectCategory(props) {

  const onSelect = (e) => {
    props.onChange({category: e.target.value});
  };

  return (
    <select className="SelectCategory" value={props.value} onChange={onSelect}>
      {props.options && props.options.map(item => {
        return <option key={item._id} value={item.title}>{item.title}</option>
    })}
    </select>
  )
}

// SelectCategory.propTypes = {
//   options: PropTypes.arrayOf(PropTypes.shape({
//     value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     title: PropTypes.string
//   })).isRequired,
//   value: PropTypes.any,
//   onChange: PropTypes.func
// };

// SelectCategory.defaultProps = {
//   onChange: () => {
//   }
// }

export default memo(SelectCategory);
