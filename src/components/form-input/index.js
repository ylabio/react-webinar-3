import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function FormInput({ type = 'text', name, id, label, placeholder, className, required }) {
  const cn = bem('FormInput');

  return (
    <div className={cn(null, [className])}>
      {label && (
        <label htmlFor={id} className={cn('label')}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={cn('input')}
        required={required}
      />
    </div>
  );
}

FormInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
};

export default memo(FormInput);
