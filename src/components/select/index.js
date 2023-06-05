import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Select({onChange, size = 's', options, children, value, disabled}) {

  const cn = bem('Select');
  const onSelect = (e) => {
    onChange(e.target.value);
  };

  return (
    <select disabled={disabled} className={cn({size})} value={value} onChange={onSelect}>
      {children || options.map(item => (
        <option key={item.value} value={item.value}>{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })),
  value: PropTypes.any,
  onChange: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['s', 'm'])
};

Select.defaultProps = {
  onChange: () => {}
}

export default memo(Select);
