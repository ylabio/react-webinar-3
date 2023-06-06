import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function UserPage({userInfo, t}) {
  const cn = bem("UserPage");
  return (
    <div className={cn()}>
      <h2>{t("profile")}</h2>
      <div className={cn("info")}>
        {t("name")}: <p>{userInfo.name}</p>
      </div>
      <div className={cn("info")}>
        {t("phone")}: <p>{userInfo.phone}</p>
      </div>
      <div className={cn("info")}>
        email: <p>{userInfo.email}</p>
      </div>
    </div>
  );
}

UserPage.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  t: PropTypes.func
};

UserPage.defaultProps = {
  t: () => {}
};

export default memo(UserPage);
