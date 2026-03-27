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

  return (
    <div className="Select-wrapper">
      <select className={cn({ size, text: !!text })} value={value} onChange={onSelect}>
        {options.map(item => (
          <option key={item.value} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
  text: PropTypes.bool,
};

export default memo(Select);
