import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import "./style.css";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";

function LoginButton(props) {
  const { text, onExit } = props;
  const { t } = useTranslate();
  const store = useStore();

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Добавлено состояние isLoggedIn

  const token = JSON.parse(localStorage.getItem("token"));

  useInit(() => {
    store.actions.user.setToken(token);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!token); // Обновляем состояние isLoggedIn при изменении токена
  }, [token]);

  const handleExit = () => {
    setIsLoggedIn(false); // Устанавливаем isLoggedIn в false при выходе
    onExit();
  };

  return (
    <div className="buttons-wrapper">
      {isLoggedIn ? ( // Используем состояние isLoggedIn для условного рендера
        // Если пользователь авторизован
        <div className="logout-wrapper">
          <div>
            <Link to="/profile">{text}</Link>{" "}
          </div>
          <button type="button" onClick={handleExit}>
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
