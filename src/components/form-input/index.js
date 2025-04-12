import PropTypes from 'prop-types';
import { memo } from 'react';

 function InputForm ({label,  id,className, ...props}){
    return(
        <div className={className}>
          <label htmlFor={id}>{label}</label>
          <input id={id} {...props}  />
        </div>
    )
}

export default memo(InputForm)

InputForm.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
};