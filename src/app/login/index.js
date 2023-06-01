import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import LoginForm from "../../components/login-form";
import {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import Auth from "../../containers/auth";


function Login() {

  const store = useStore();

  const select = useSelector(state => ({
    loginWaiting: state.auth.loginWaiting,
    loginError: state.auth.loginError
  }))

  const callback = {
    onSubmit: useCallback((values) => {
      store.actions.auth.login(values);
    }, [])
  }

  return (
    <PageLayout>
      <Auth/>
      <Head title={'Магазин'}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm onSubmit={callback.onSubmit} error={select.loginError} loginWaiting={select.loginWaiting}/>
    </PageLayout>
  );
}

export default Login;
