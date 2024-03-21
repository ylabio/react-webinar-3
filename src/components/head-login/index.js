import { cn as bem } from "@bem-react/classname";
import { memo } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../side-layout";

function HeadLogin(props) {
  //todo: change onclick and text depending on log status
  const cn = bem("headLogin");
  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <SideLayout side="end">
        <Link to="/profile">{props.username}</Link>
        {props.auth ? (
          <button className={cn("button", {logout: true})} onClick={props.onClick}>{t("profile.logoutButton")}</button>
        ) : (
          <button className={cn("button")}>
            <Link to="/login" className={cn("text")}>
              {t("profile.loginButton")}
            </Link>
          </button>
        )}
      </SideLayout>
    </div>
  );
}

export default memo(HeadLogin);
