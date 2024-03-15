import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import { useCallback, useEffect, useState } from "react";
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from "../../containers/locale-select";
import Label from "../../components/label";
import SideLayout from "../../components/side-layout";
import FormFields from "../../components/form-fields";
import { useLocation, useNavigate } from "react-router-dom";
import AuthorizationContainer from "../../containers/authorization-container";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";


function Login() {

  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState({
    login: '',
    password: ''
  });

  const select = useSelector(state => ({
    error: state.authorization.error,
    user: state.authorization.user,
  }))

  useEffect( () => {
    if (!select.error && select.user) {
      const navigationPath =  location.state?.backNavigate && location.state?.backNavigate !== location.pathname ? location.state.backNavigate : '/';
      navigate(navigationPath)
    }
  }, [select.error, select.user] );


  const callbacks = {
    onChange: useCallback((name, value) => {
      setValue(state => ({...state, [name]: value}))
    }, []),
    onSubmit: useCallback(e => {
      e.preventDefault();
      store.actions.authorization.signIn(value);
    }, [value])
  }

  return (
    <PageLayout>
      <AuthorizationContainer/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <SideLayout padding={'medium'}>
        <form onSubmit={ callbacks.onSubmit }>
          <h2>{ t( 'login.title' ) }</h2>
          <Label title={ t( 'login.login' ) } name='login' type='text' value={ value.login }
                 onChange={ callbacks.onChange }/>
          <Label title={ t( 'login.password' ) } name='password' type='password' value={ value.password }
                 onChange={ callbacks.onChange }/>
          <FormFields>
            <p>{select.error}</p>
          </FormFields>
          <FormFields>
            <button>{ t( 'login.button' ) }</button>
          </FormFields>
        </form>
      </SideLayout>

    </PageLayout>)
}

export default Login;