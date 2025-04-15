import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Select(props) {

  const cn = bem('Select');
  const { onChange = () => {}, options, value, size, text } = props;
  const onSelect = e => {
    onChange(e.target.value);
  };

  const stringValue = (itemValue) => Array.isArray(itemValue) ? itemValue.join(',') : itemValue;

  return (
    <select className={cn({ size, text: !!text })} value={value} onChange={onSelect}>
      {options.map(item => (
        <option className={cn('option')} key={stringValue(item.value)} value={stringValue(item.value)}>
          {item.title}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        )]),
      title: PropTypes.string,

    }),
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  text: PropTypes.bool,
};

export default memo(Select);
