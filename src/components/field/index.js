import React, { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
function Field(props) {
  return (
    <label className={`Field`}>
      {props.placeholder}
      <input {...props} placeholder="" />
    </label>
  );
}
Field.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "number",
    "password",
    "checkbox",
    "radio",
    "submit",
    "reset",
    "file",
    "hidden",
    "image",
    "button",
  ]),
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  size: PropTypes.number,
  autoComplete: PropTypes.string,
};
export default memo(Field);
