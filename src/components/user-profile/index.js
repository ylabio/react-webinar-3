import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const UserProfile = ({ user, t }) => {
  const cn = bem("UserProfile");
  return (
    <>
      {user && (
        <div className={cn()}>
          <h2 className={cn("title")}>{t("profile.title")}</h2>
          <div className={cn("wrapper")}>
            <p>
              {t("profile.name")} <span>{user.profile.name}</span>
            </p>
            <p>
              {t("profile.phone")} <span>{user.profile.phone}</span>
            </p>
            <p>
              email: <span>{user.email}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(UserProfile);
