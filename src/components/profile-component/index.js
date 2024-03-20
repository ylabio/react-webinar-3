import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Profile({ t, userData }) {
  const cn = bem("Profile");
  return (
    <div className={cn()}>
      <h2 className={cn("title")}>{t("profile")}</h2>
      <ul className={cn("info-list")}>
        <li className={cn("info-item")}>
          {t("profile.name")}: <span>{userData?.profile.name || ""}</span>
        </li>
        <li className={cn("info-item")}>
          {t("profile.phone")}: <span>{userData?.profile.phone || ""}</span>
        </li>
        <li className={cn("info-item")}>
          {t("profile.email")}: <span>{userData?.email || ""}</span>
        </li>
      </ul>
    </div>
  );
}

export default memo(Profile);
