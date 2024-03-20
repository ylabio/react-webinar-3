import {memo} from 'react';
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthHeader from '../../components/auth-header';
import LoginForm from '../../components/login-form';

function Login(props) {

  const store = useStore();

  useInit(() => {
    store.actions.user.setState({...store.actions.user.getState(), errorMessage: ''});
  }, [store], true);

  const callbacks = {
    handleSignIn(e) {
      e.preventDefault();
      const login = e.target.login.value;
      const password = e.target.password.value;
      callbacks.onSignIn({login, password});
    },
    onSignIn: (body) => props.onLogin(body),
  }

  const select = useSelector((state) => ({
    errorMessage: state.user.errorMessage,
  }));

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthHeader
        buttonTitle='Вход'
        link={'/login'}
      />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm
        onSignIn={callbacks.onSignIn}
        handleSignIn={callbacks.handleSignIn}
        errorMessage={select.errorMessage}
      />
    </PageLayout>
  );
}

export default memo(Login);
