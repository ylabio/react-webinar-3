import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import './style.css';

function FormInput({title, value, ...rest}) {

  const cn = bem('FormInput');

  return (
    <label className={cn()}>
      {title}
      <input
        className={cn('input')}
        value={value}
        {...rest}
      />
    </label>
  )
}

FormInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
};

export default FormInput;