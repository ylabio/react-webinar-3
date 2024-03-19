import { cn as bem } from "@bem-react/classname";
import { memo } from 'react';
import "./style.css";
import { Link } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../side-layout";

function HeadLogin() {
  //todo: change onclick and text depending on log status
  const logged = false;
  const cn = bem("headLogin");
  const { t } = useTranslate();

  return (
    <SideLayout side='end'>
      <button className={cn("button")}>
        <Link to='/login' className={cn("text")}>
          {logged ? t("profile.logoutButton") : t("profile.loginButton")}
        </Link>
      </button>
    </SideLayout>
  );
}

export default memo(HeadLogin);
