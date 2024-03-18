import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head({ isLoggedIn, onLogin, onLogout, profileLink, t }) {
  return (
    <div className="LoginControls">
      {isLoggedIn ? (
        <>
          <div className="LoginControls-link">
            {profileLink}
          </div>
          <button onClick={onLogout}>{t("toLogout")}</button>
        </>
      ) : (
        <button onClick={onLogin}>{t("toLogin")}</button>
      )}
    </div>
  );
}

Head.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  profileLink: PropTypes.node.isRequired,
  t: PropTypes.func.isRequired
};

export default memo(Head);
