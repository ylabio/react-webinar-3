import PropTypes from "prop-types";
import { memo } from "react";
import "./style.css";

function Select(props) {
  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <select
      className="Select"
      value={props.value}
      onChange={onSelect}
      disabled={props.disabled}
    >
      {props.options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  disabled: false,
  onChange: () => {},
};

export default memo(Select);
