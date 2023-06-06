import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import "./style.css";

function LoginButtons({userName, onExitAccount, t, loggedIn}) {
  const cn = bem("LoginButtons");

  return (
    <div className={cn()}>
      {loggedIn ? (
        <div className={cn("user-info")}>
          <Link to="/profile">
            <p>{userName}</p>
          </Link>
          <button onClick={() => onExitAccount()}>{t("header.exit")}</button>
        </div>
      ) : (
        <Link to="/login">
          <button>{t('header.enter')}</button>
        </Link>
      )}
    </div>
  );
}

LoginButtons.propTypes = {
  userName: PropTypes.string,
  onExitAccount: PropTypes.func,
  t: PropTypes.func,
  loggedIn: PropTypes.bool
};

LoginButtons.defaultProps = {
  userName: "",
  loggedIn: false,
  onExitAccount: () => {},
  t: () => {},
};

export default memo(LoginButtons);
