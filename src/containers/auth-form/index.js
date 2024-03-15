import {memo, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import LoginForm from "../../components/login-form";
import useAuth from "../../hooks/use-auth";

function AuthForm() {
  
  const {error, logIn} = useAuth();

  const {t} = useTranslate();

  const content = useMemo(() => ({
    title: t('auth.login'),
    login: t('auth.form.login'),
    password: t('auth.form.password'),
    button: t('auth.form.button'),
  }), [t])

  return (
    <LoginForm error={error} onLogIn={logIn} {...content} />
  );
}

export default memo(AuthForm);
