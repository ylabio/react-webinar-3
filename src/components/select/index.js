import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function Select(props) {
  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  const cn = bem('Select');

  return (
    <select
      className={cn({ [props.type]: true })}
      value={props.value}
      onChange={onSelect}
    >
      {props.options.map((item) => (
        <option key={item.value} value={item.value}>
          {'- '.repeat(item.dashes)}
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
      dashes: PropTypes.number,
    })
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  dashes: 0,
  onChange: () => {},
};

export default memo(Select);
