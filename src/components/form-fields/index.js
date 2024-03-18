import './style.css';
import PropTypes from "prop-types";

function FormFields(props) {
  return (
    <div className={'FormFields'}>
      {props.children}
    </div>
  )
}

FormFields.propTypes = {
  title: PropTypes.element,
};

export default FormFields;