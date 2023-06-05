import { memo} from "react";
import PropTypes from 'prop-types';
import { Link} from "react-router-dom";
import SideLayout from "../side-layout";

function LoginTool(props) {

  return (
      <SideLayout side="end" padding="login" gap="medium" border='bottom'>
        {props.isAuth
          ?
          <>
            <Link to={"/profile"}>{props.userName}</Link>
            <button onClick={props.logout}>{props.logoutText} </button>
          </>
          : <Link to={"/login"}><button >{props.loginText} </button></Link>}
      </SideLayout>
  );
}

LoginTool.propTypes = {
  isAuth: PropTypes.bool,
  userName: PropTypes.string,
  logout: PropTypes.func,
  loginText: PropTypes.string,
  logoutText: PropTypes.string
}

LoginTool.defaultProps = {
  logout: () => {},
  userName: ''
}

export default memo(LoginTool);
