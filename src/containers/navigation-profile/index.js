import {memo, useCallback, useMemo} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import FormLogin from "../../components/form-login";
import FormProfile from "../../components/form-profile";
import Spinner from "../../components/spinner";
import {Navigate} from "react-router-dom";

/**
 * Контейнер с компонентами навигации для перехода на страницу профиля пользователя
 */
function NavigationProfile() {
  const store = useStore();

  useInit(() => {
  }, []);

  const select = useSelector(state => ({
    data: state.user.data,
    autorization: state.user.autorization,
    waiting: state.user.waiting,
    error: state.user.error,
    errorReally: state.user.errorReally
  }));

  const {t} = useTranslate();

  const callbacks = { 
    onAutorization: useCallback((login,password) => {
      if (localStorage.getItem('token') == '') {
        store.actions.user.fAutorization(login,password);
        return 1;//Удачная авторизация
      }
      else {
        store.actions.user.fExit();
        if (true) {
          store.actions.user.fAutorization(login,password);
          return 1;//Удачная авторизация
        }
        else {
          return 2;//Не удалось выйти с сайта
        }
      }
      return 3;//Ошибка в программе
    }, [store]),   
  }

  const options = {
    formLogin: useMemo(() => (
      {key: 333, login: '', password: '', link: `/profile`}
    ), [t,select]),

    formProfile: useMemo(() => (
      {key: 444, link: `/login`}
    ), [t,select])
  };

  return (
    <>
    {(window.location.pathname == `/login` && localStorage.getItem('token') ?
      <Navigate to={`/profile`} replace={true} />  : '' )}
    {(window.location.pathname == `/profile` && !localStorage.getItem('token') || select.error == 5 ?
      <Navigate to={`/login`} replace={true} /> :
      '' )}
    
    <Spinner active={select.waiting}>
    {(select.autorization == false ?
      <FormLogin item={options.formLogin} error={select.error} onLogin={callbacks.onAutorization} t={t} errorReally={select.errorReally}/>
      :
      <FormProfile item={options.formProfile} data={select.data} autorization={select.autorization} t={t}/>
    )}
    </Spinner>
    </>
  );
}

export default memo(NavigationProfile);
