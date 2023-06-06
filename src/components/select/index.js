import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Select(props) {

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };
  const cn = bem('Select');
  return (
    <select className={cn({theme: props.theme})} value={props.value} onChange={onSelect}>
      {props.options.map(item => (
        <option key={item.value} value={item.value}>{item.title}</option>
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
  theme: PropTypes.oneOf(['semi-medium', 'medium','large']),
};

Select.defaultProps = {
  onChange: () => {},
  theme: 'medium'
}

export default memo(Select);
