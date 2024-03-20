import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import "./style.css";

function ProfileCard({ user, t }) {
  const cn = bem("ProfileCard");

  return (
    <div className={cn()}>
      <h2 className={cn("title")}>{t("profile.title")}</h2>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("profile.name")}:</div>
        <div className={cn("value")}>{user.profile?.name}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("profile.phone")}:</div>
        <div className={cn("value")}>{user.profile?.phone}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("profile.email")}:</div>
        <div className={cn("value")}>{user?.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.object,
  t: PropTypes.func,
};

ProfileCard.defaultProps = {
  user: {},
  t: () => {},
};

export default ProfileCard;
