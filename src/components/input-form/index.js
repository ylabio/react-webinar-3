import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function InputForm({ title, type, name, onChange, value }) {
  const cn = bem('InputForm');

  return (
    <div className={cn()}>
      <span>{title}</span>
      <input name={name} type={type} value={value} onChange={onChange}/>
    </div>
  );
}

InputForm.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
};

InputForm.defaultProps = {
  onChange: (e) => {},
}


export default memo(InputForm);
