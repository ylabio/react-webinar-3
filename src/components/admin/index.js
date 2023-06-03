import React, { memo } from "react";
import { Link } from "react-router-dom";

import "style.css";
import Spinner from "../spinner";

const Admin = (props) => {
  return (
    <div className="Head-login">
      {props.userName ? (
        <Spinner active={props.waiting}>
          <Link to={props.url} className="Head-user">
            {props.userName}
          </Link>
          <Link to={props.urlExit}>
            <button onClick={() => props.logOut(props.token)}>
              {props.exit}
            </button>
          </Link>
        </Spinner>
      ) : (
        <Link to={props.urlLogin}>
          <button>{props.login}</button>
        </Link>
      )}
    </div>
  );
};

export default memo(Admin);
