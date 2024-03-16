import {memo, useCallback} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Auth from "../../components/auth";
import useInit from "../../hooks/use-init";
import { useNavigate } from "react-router-dom";

/**
 * Контейнер с компонентами навигации
 */
function Autorisation() {

  const store = useStore();

  const select = useSelector(state => ({
    userName: state.user.data.userName,
    isAuth: state.user.isAuth
  }));

  useInit(() => {
    if(window.localStorage.getItem('access_token')){
      store.actions.user.load();
    }
  }, []);

  const navigate = useNavigate();

  const callbacks = {
     // выход
     onLogout: useCallback(() => store.actions.user.logout(), [store]),
     NavigateTo:useCallback(()=>navigate("/login"),[])
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
