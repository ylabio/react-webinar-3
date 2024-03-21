import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css"

function LogoutUserButton(props) {


  return (
    <>
      <Link className="LogoutUserButton-name" to={"/profile"}>{props.userName}
      </Link>
      <button className="LogoutUserButton-button" type="button" onClick={props.logOut}>{props.buttonText}
      </button>
    </>
  );
}

LogoutUserButton.propTypes = {
  userName: PropTypes.string.isRequired,
  logOut: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
};

export default memo(LogoutUserButton);
