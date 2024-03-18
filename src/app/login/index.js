import { memo, useCallback, useState } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Form from "../../components/form";
import Label from "../../components/label";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import FormInput from "../../components/form-input";
import { useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";

function Login() {
  const store = useStore();
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');

  const {t} = useTranslate();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    error: state.login.error,
    user: state.login.loginData
  }))

  const callbacks = {
    onLogin: useCallback((loginName, password) => store.actions.login.login({login: loginName, password: password}), [store])
  }

  useInit(() => {
    if (select.user.profile) {
      navigate('/profile');
      return null;
    }
  }, [select.user.username, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    callbacks.onLogin(loginName, password);
    if (select.user && Object.keys(select.user).length !== 0) {
      navigate('/profile');
    }
  }

  return (
    <PageLayout>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Form 
        title={t('login.btn')} 
        btnTitle={t('login.submit')} 
        className={'login'} 
        onSubmit={handleSubmit}
        error={select.error}
      >
        <Label id={'login'} title={'Логин'}/>
        <FormInput id={'login'} value={loginName} onChange={setLoginName} />
        <Label id={'password'} title={'Пароль'} />
        <FormInput id={'password'} type={'password'} value={password} onChange={setPassword} />
      </Form>
    </PageLayout>
  )
}

export default memo(Login);