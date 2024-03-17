import {memo, useCallback, useState} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import FormLayout from "../../components/form-layout";
import Input from "../../components/input";
import Button from "../../components/button"; 

function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    isLogged: state.auth.isLogged,
    waiting: state.auth.waiting,
    error: state.auth.error,
  }));

  const data = {
    login: login.trim(), 
    password: password.trim()
  };

  const callbacks = {
    onSignIn: useCallback(() => store.actions.auth.signIn(data), [store, data]),
  }

  return (
    <FormLayout title={t('signin')} onSubmit={callbacks.onSignIn}>
      <Input label={t('input.login')} value={login} onChange={setLogin}/>
      <Input label={t('input.pass')} value={password} onChange={setPassword}/>
      {select.error && <span style={{color: '#FF0000'}}>{select.error}</span>}
      <Button type='submit' disabled={select.waiting} text_btn={t('auth.signin')}/>
    </FormLayout>
  )  
}

export default memo(LoginForm);

