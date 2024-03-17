import React, {memo} from "react";
import {Link} from "react-router-dom";
import "./style.css";
import PropTypes from "prop-types";

const UserPanel = (props) => {

  return (
    <div className="UserPanel">
      {props.loggedIn && <span><Link to={props.profile}>{props.userName}</Link></span>}
      <Link to={props.login}>
        <button onClick={props.callBack}>{props.title}</button>
      </Link>
    </div>
  );
};

UserPanel.propTypes = {
  title: PropTypes.string,
  login: PropTypes.string,
  profile: PropTypes.string,
  loggedIn: PropTypes.bool,
  userName: PropTypes.string,
};
UserPanel.defaultProps = {
  callBack: () => {
  },
  t: (text) => text
}

export default memo(UserPanel);
