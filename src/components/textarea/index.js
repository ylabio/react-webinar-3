import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Textarea({ value, onChange, placeholder = '', rows = 5 }) {
  const cn = bem('Textarea');

  return (
    <textarea
      className={cn()}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
    />
  );
}

Textarea.propTypes = {
  onChange: PropTypes.func,
  rows: PropTypes.number,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

export default memo(Textarea);
