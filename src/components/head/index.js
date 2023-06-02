import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";

function Head(props) {
  return (
    <div className="Head">
      <div className="Head-login">
        {props.token ? (
          <>
            {" "}
            <Link to={props.url} className="Head-user">{props.user}</Link>
            <Link to={props.urlExit}><button onClick={() => props.logOut(props.token)}>
              {props.exit}
            </button></Link>
          </>
        ) : (
          <Link to={props.urlLogin}>
            <button>{props.login}</button>
          </Link>
        )}
      </div>
      <div className="Head-body">
        <div className="Head-place">
          <h1>{props.title}</h1>
        </div>
        <div className="Head-place">{props.children}</div>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  login: PropTypes.node,
  exit: PropTypes.node,
  url: PropTypes.string,
  token: PropTypes.string,
  children: PropTypes.node,
  urlLogin: PropTypes.string,
  logOut: PropTypes.func,
  user:PropTypes.string
};

Head.defaultProps = {
  logOut: () => {},
};

export default memo(Head);
