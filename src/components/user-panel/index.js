import React, {memo} from "react";
import {Link} from "react-router-dom";
import "./style.css";
import PropTypes from "prop-types";

const UserPanel = (props) => {

  return (
    <div className="UserPanel">
      {props.loggedIn && <span className={'UserPanel-name'}><Link to={props.profile}>{props.userName}</Link></span>}
      <Link className={'UserPanel-button'} to={props.buttonPath}>
        <button onClick={props.callBack}>{props.title}</button>
      </Link>
    </div>
  );
};

UserPanel.propTypes = {
  title: PropTypes.string,
  buttonPath: PropTypes.string,
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
