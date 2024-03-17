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
    login: state.user.login,
    password: state.user.password,
    token: state.user.token,
    data: state.user.data,
    autorization: state.user.autorization,
    waiting: state.user.waiting,
    error: state.user.error,
  }));

  const {t} = useTranslate();

  const callbacks = { 
    onAutorization: useCallback((login,password) => {
      let vToken;
      if (select.token == '') {
        vToken = store.actions.user.fAutorization(login,password);
        vToken.then((token => {
          if (token != '') store.actions.user.setParams(token,true,'profile');
          return 1;//Удачная авторизация
        }));
      }
      else {
        store.actions.user.fExit();
        if (true) {
          vToken = store.actions.user.fAutorization(login,password);
          vToken.then((token => {
            if (token != '') store.actions.user.setParams(token,true,'profile');
            return 1;//Удачная авторизация
          }));
        }
        else {
          return 2;//Не удалось выйти с сайта
        }
      }
      return 3;//Ошибка в программе
    }, [store,select]),   
  }

  const options = {
    formLogin: useMemo(() => (
      {key: 333, login: select.login, password: select.password, link: `/profile?token=${select.token}`}
    ), [t,select]),

    formProfile: useMemo(() => (
      {key: 444, link: `/login?token=${select.token}`}
    ), [t,select])
  };

  let urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  return (
    <>
    {(window.location.pathname == `/profile` && !token || select.error == 5 ?
      <Navigate to={`/login`} replace={true} /> :
      '' )}
    
    <Spinner active={select.waiting}>
    {(select.autorization == false ?
      <FormLogin item={options.formLogin} error={select.error} onLogin={callbacks.onAutorization} t={t}/>
      :
      <FormProfile item={options.formProfile} data={select.data} autorization={select.autorization} t={t}/>
    )}
    </Spinner>
    </>
  );
}

export default memo(NavigationProfile);
