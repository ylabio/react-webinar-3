import { memo, useCallback, useEffect, useState } from "react"
import useTranslate from "../../hooks/use-translate"
import InputLogin from "../../components/input-login"
import LoginContainer from "../../components/login-Container"
import useStore from "../../hooks/use-store"
import Spinner from "../../components/spinner"
import useSelector from "../../hooks/use-selector"
import { useNavigate } from "react-router-dom"
import LoginForm from "../../components/login-form"

function AuthForm(){
  const store = useStore();
  const {t} = useTranslate();
  
  const select = useSelector(state => ({
    error: state.auth.error,
    waiting: state.auth.waiting,
    isAuth: state.auth.isAuth,
  }));
  
  const callbacks = {
    login: useCallback((body) => {
      store.actions.auth.login(body);
    })
  };

  return (
  <LoginContainer>
    <h1>{t('entrance')}</h1>
    <Spinner active={select.waiting}>
    <LoginForm error={select.error} login={callbacks.login} t={t} isAuth={select.isAuth}/>
    </Spinner>
  </LoginContainer>)
}

export default memo(AuthForm)