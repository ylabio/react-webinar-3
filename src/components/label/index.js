import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import './style.css';

function FormInput({title, type, name, value, errorMessage, onChangeInput}) {

  const cn = bem('FormInput');

  const onChange = (event) => {
    onChangeInput(name, event.target.value);
  };

  return (
    <>
    <label className={cn()}> {title}
      <input className={cn('input')} name={name} type={type} value={value} onChange={onChange} />
    </label>
    {errorMessage && <p className={cn('error')}>{errorMessage}</p>}
    </>
  )
}

FormInput.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

FormInput.defaultProps = {
  onChange: () => {},
}

export default FormInput;