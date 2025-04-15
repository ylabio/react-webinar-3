import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function FieldInput({
                     value = '',
                     name,
                     type = 'text',
                     placeholder,
                     onChange = () => {},
                     theme = '',
                     label = '',
                   }) {

  // Обработчик изменений в поле
  const handleChange = event => {
    onChange(event.target.value);
  };

  const cn = bem('FieldInput');
  return (
    <div className={cn()}>
      {label && <label className={cn('label')} htmlFor={name}>{label}</label>}
      <input
        id={name}
        className={cn('item',{theme})}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

FieldInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
};

export default memo(FieldInput);
