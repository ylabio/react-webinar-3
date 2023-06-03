import { memo } from "react";
import { Link } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import "./style.css";

function LoginButton(props) {
  const { text, onExit } = props;
  const { t } = useTranslate();
  return (
    <div className="buttons-wrapper">
      {props.isAuthenticated ? (
        // Если пользователь авторизован
        <div className="logout-wrapper">
          <div>
            <Link to="/profile">{text}</Link>{" "}
          </div>
          <button type="button" onClick={onExit}>
            {t("user.signOut")}
          </button>
        </div>
      ) : (
        // Если пользователь не авторизован
        <div>
          <Link to="/login">
            <button> {t("user.signIn")}</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default memo(LoginButton);
