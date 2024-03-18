import { memo, useState, useCallback } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Input from "../../components/input";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";

const Login = () => {

  const {t} = useTranslate();
  const store = useStore();

  const [form, setFormValue] = useState({
    email: '',
    password: ''
  });

  const callbacks = {
    onFormSubmit: useCallback((e) => {
      console.log(form);
      e.preventDefault();
      store.actions.user.login(form.email, form.password), [store]
    }),
    onEmailChange: (value) => {
      setFormValue({...form, email: value });
    },
    onPasswordChange: (value) => {
      setFormValue({...form, password: value });
    },
  }
  
  return (
  <PageLayout>
    <Head title={t('title')} />
    <form onSubmit={callbacks.onFormSubmit}>
      <h2>Вход</h2>
      <Input 
        value={form.email} 
        onChange={callbacks.onEmailChange} 
        placeholder={'E-mail'}
        delay={1000}
      />
      <Input 
        value={form.password} 
        onChange={callbacks.onPasswordChange} 
        placeholder={'Password'} 
        delay={1000} 
      />
      <input type="submit" value="Войти" />
    </form>
  </PageLayout>
  );
}

export default memo(Login);