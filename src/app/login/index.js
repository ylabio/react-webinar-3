import { memo, useState, useCallback, useEffect } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from '../../hooks/use-selector';
import ProfileBar from '../../containers/profile-bar';
import LocaleSelect from "../../containers/locale-select";
import "./style.css";

const Login = () => {

  const {t} = useTranslate();
  const store = useStore();

  const [form, setFormValue] = useState({
    email: '',
    password: ''
  });

  const errorMessage = useSelector(state => state.user.errorMessage);

  const callbacks = {
    onFormSubmit: useCallback((e) => {
      e.preventDefault();
      store.actions.user.login(form.email, form.password), [store]
    }),
    onChange: (e) => {
      e.preventDefault();
      setFormValue({...form, [e.target.name]: e.target.value });
    },
  }
  
  return (
  <PageLayout>
    <ProfileBar />
    <Head title={t('title')} >
      <LocaleSelect />
    </Head>
    <Navigation />
    <form className="Login-form" onSubmit={callbacks.onFormSubmit}>
      <h2 className="Login-title">Вход</h2>
      <label className="Login-label">Логин</label>
      <input className="Login-input" type="text" name="email" onChange={callbacks.onChange} />
      <label className="Login-label">Пароль</label>
      <input className="Login-input" type="text" name="password" onChange={callbacks.onChange} />
      <input className="Login-button" type="submit" value="Войти" />
      {errorMessage && <p className="Login-error">{errorMessage}</p>}
    </form>
  </PageLayout>
  );
}

export default memo(Login);