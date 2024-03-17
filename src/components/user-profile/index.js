import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const UserProfile = ({ username, t }) => {
  const cn = bem("UserProfile");
  console.log(username);

  return (
    <>
      {username && (
        <div className={cn()}>
          <h2 className={cn("title")}>{t("profile.title")}</h2>
          <div className={cn("wrapper")}>
            <p>
              {t("profile.name")} <span>{username.profile.name}</span>
            </p>
            <p>
              {t("profile.phone")} <span>{username.profile.phone}</span>
            </p>
            <p>
              email: <span>{username.email}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(UserProfile);
