import { memo } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Input from "../input";

function LoginForm(props) {
  const cn = bem("loginForm");

  const store = useStore();

  const error = true;

  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <p className={cn("title")}>{t("login.title")}</p>
      <div className={cn("container")}>
        <p className={cn("text")}>{t("login.input.label")}</p>
        <Input type="text" theme={"form"} />
        <p className={cn("text")}>{t("login.password.label")}</p>
        <Input type="password" theme={"form"} />
        {error && (
          <p className={cn("text", { error: true })}>{'abooobbaaaa'}</p>
        )}
      </div>
      <button>{t("login.button")}</button>
    </div>
  );
}

export default memo(LoginForm);
