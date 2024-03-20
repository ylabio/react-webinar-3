import {memo, useCallback} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Auth from "../../components/auth";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Контейнер с компонентами навигации
 */
function Autorisation() {
  const location = useLocation();

  const store = useStore();

  const select = useSelector(state => ({
    userName: state.user.data.userName,
    isAuth: state.user.isAuth
  }));

  const navigate = useNavigate();

  const callbacks = {
     // выход
     onLogout: useCallback(() => store.actions.user.logout(), [store]),
     //вход
     NavigateTo:useCallback(()=>navigate("/login",{state:{redirectTo: location.pathname}}),[])
  }

  // Функция для локализации текстов
  const {t} = useTranslate();

  return (
    <Auth userName={select.userName} isAuth={select.isAuth} 
    logout={callbacks.onLogout} NavigateTo={callbacks.NavigateTo} link={'/profile'}
    buttonLogIn={t('auth.buttonIn')} buttonLogOut={t('auth.buttonOut')}
    />
  );
}

export default memo(Autorisation);
