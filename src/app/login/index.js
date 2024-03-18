import { memo, useState, useCallback, useEffect } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Input from "../../components/input";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from '../../hooks/use-selector';
import ProfileBar from '../../containers/profile-bar';

const Login = () => {

  const {t} = useTranslate();
  const store = useStore();

  useEffect(() => {
    console.log("login page");
  }, [])

  const [form, setFormValue] = useState({
    email: '',
    password: ''
  });

  const errorMessage = useSelector(state => state.user.errorMessage);

  const callbacks = {
    onFormSubmit: useCallback((e) => {
      console.log(form);
      e.preventDefault();
      store.actions.user.login(form.email, form.password), [store]
    }),
    onChange: (e) => {
      e.preventDefault();
      console.log(e);
      setFormValue({...form, [e.target.name]: e.target.value });
      console.log(form);
    },
    // onPasswordChange: (e) => {
    //   e.preventDefault();
    //   setFormValue({...form, password: value });
    //   console.log(form);
    // },
  }
  
  return (
  <PageLayout>
    <ProfileBar />
    <Head title={t('title')} />
    <form onSubmit={callbacks.onFormSubmit}>
      <h2>Вход</h2>
      <input type="text" name="email" onChange={callbacks.onChange} placeholder="E-mail" />
      <input type="text" name="password" onChange={callbacks.onChange} placeholder="Password" />
      {/* <Input 
        value={form.email} 
        onChange={callbacks.onEmailChange} 
        placeholder={'E-mail'}
        delay={0}
      />
      <Input 
        value={form.password} 
        onChange={callbacks.onPasswordChange} 
        placeholder={'Password'} 
        delay={0}
      /> */}
      <input type="submit" value="Войти" />
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  </PageLayout>
  );
}

export default memo(Login);