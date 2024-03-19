import {memo, useMemo, useCallback} from "react";
import useTranslate from "../../hooks/use-translate";
import LoginForm from "../../components/login-form";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function AuthForm() {
  
  const {t} = useTranslate();

  const content = useMemo(() => ({
    title: t('auth.login'),
    login: t('auth.form.login'),
    password: t('auth.form.password'),
    button: t('auth.form.button'),
  }), [t])

  const store = useStore();

  const select = useSelector(state => ({
    authError: state.auth.authError
  }));

  const callbacks = {
    logIn: useCallback((login, password) => store.actions.auth.logIn(login, password), [store]),
  }

  return (
    <LoginForm error={select.authError} onLogIn={callbacks.logIn} {...content} />
  );
}

export default memo(AuthForm);
