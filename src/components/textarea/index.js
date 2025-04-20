import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function Textarea({ theme = '', value, onChange, ...props }) {
  const cn = bem('Textarea');

  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <textarea className={cn({ theme: theme })} value={value} onChange={handleChange} {...props} />
  );
}

Textarea.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
};

export default memo(Textarea);
