import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css"

function LoginUserButton(props) {


  return (
    <Link className="LoginUserButton-button" to="/login" >{props.buttonText}</Link>
  );
}

LoginUserButton.propTypes = {
  buttonText: PropTypes.string.isRequired
};

export default memo(LoginUserButton);