import {memo, useCallback, useEffect} from 'react';
import PageLayout from '../../components/page-layout';
import AuthControl from '../../components/auth-control';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useTranslate from '../../hooks/use-translate';
import Auth from '../../components/auth';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';
import useInit from '../../hooks/use-init';

function Login() {

    const store = useStore();
    const navigate = useNavigate();
    const select = useSelector(state => ({
      error: state.auth.error,
      name: state.auth.profileInfo.result?.profile?.name,
      token: state.auth.profileInfo.token
    }));
    const {t} = useTranslate();
    const callbacks = {
      // Авторизация
      onAuth: useCallback((login,password) => store.actions.auth.login({login,password})),
      onGet: useCallback(() => store.actions.auth.getProfile()),
      clear: useCallback(() => store.actions.auth.clearError()),
    };
    useInit(() => {
    if (select.name) {
      navigate(-1)
    }
    }, [select.name])

    useEffect(() => callbacks.clear(), [])
  return (
      <>
        <Navigation/>
        <Auth error={select.error} onAuth={callbacks.onAuth} t={t}/>
      </>
  );
}

export default memo(Login);