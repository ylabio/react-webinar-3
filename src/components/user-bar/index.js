import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import { Link, useNavigate } from "react-router-dom";
import "./style.css"
/**
 * Контейнер с компонентами навигации
 */
function UserBar(props) {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    userName: state.auth.user?.profile?.name,
  }));

  const callbacks = {
    // Добавление в корзину
    login: useCallback(body => store.actions.auth.login(body), [store]),
    logOut: useCallback(() => store.actions.auth.logOut(), [store]),
    getUserInfo: useCallback(() => store.actions.auth.getUserInfo(), [store]),
  }

  // Функция для локализации текстов

  return (
    <SideLayout side='end'>
      {select.userName ? <><Link className="UserBar-name" to={"/profile"}>{select.userName}
      </Link>
        <button className="UserBar-button" type="button" onClick={callbacks.logOut}>Выход
        </button></> : <button className="UserBar-button" type="button" onClick={() => navigate("/login")}>Вход
      </button>}
    </SideLayout>
  );
}

export default memo(UserBar);
