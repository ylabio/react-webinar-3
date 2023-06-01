import React, { memo } from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import "./style.css";

const ProfileDetails = () => {
  const { t } = useTranslate();
  const user = useSelector((state) => state.login.user);

  return (
    <div className="ProfileDetails">
      <h3>{t("profile.header")}</h3>
      <p>
        <span>{t("profile.name")}</span>
        <b>{user.profile.name}</b>
      </p>
      <p>
        <span>{t("profile.phone")}</span>
        <b>{user.profile.phone}</b>
      </p>
      <p>
        <span>{t("profile.email")}</span>
        <b>{user.email}</b>
      </p>
    </div>
  );
};

export default memo(ProfileDetails);
