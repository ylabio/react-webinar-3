import { memo, useCallback, useEffect } from "react"
import useTranslate from "../../hooks/use-translate"
import LoginContainer from "../../components/login-Container"
import useStore from "../../hooks/use-store"
import Spinner from "../../components/spinner"
import useSelector from "../../hooks/use-selector"
import LoginForm from "../../components/login-form"
import LoginHeader from "../../components/login-header"

function AuthForm(){
  const store = useStore();
  const {t} = useTranslate();
  
  const select = useSelector(state => ({
    error: state.auth.error,
    waiting: state.auth.waiting,
    isAuth: state.auth.isAuth,
  }));

  useEffect(()=>{
    console.log('init')
    store.actions.auth.initState()
  }, [])
  
  const callbacks = {
    login: useCallback((body) => {
      store.actions.auth.login(body);
    })
  };

  return (
  <LoginContainer>
    <LoginHeader title={t('entrance')}/>
    <Spinner active={select.waiting}>
    <LoginForm error={select.error} login={callbacks.login} t={t} isAuth={select.isAuth}/>
    </Spinner>
  </LoginContainer>)
}

export default memo(AuthForm)