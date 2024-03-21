import React, { memo } from "react";
import "./style.css";
import PropTypes from "prop-types";
function Form({ children, handleSubmit, error, titleBtn }) {
  return (
    <form onSubmit={handleSubmit} className="Form">
      {children}
      {error && <span className="Form-error">{error}</span>}
      <button type="submit" className="Form-submit">
        {titleBtn}
      </button>
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  titleBtn: PropTypes.string,
};

Form.defaultProps = {
  error: "",
  titleBtn: "sign in",
};
export default memo(Form);
