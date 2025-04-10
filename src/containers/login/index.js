import { memo, useCallback } from "react"
import LoginForm from "../../components/login-form"
import useStore from "../../hooks/use-store"
import useTranslate from "../../hooks/use-translate";

function Login (){
    const store = useStore();
    const callbacks ={
        onLogin : useCallback( data => store.actions.user.logIn(data),[store])
    }
    const {t} = useTranslate();
    return(
        <>
        <div>
            <LoginForm buttonMessage={t('login.button')} header={t('login.enter')} loginLabel={t('login.login')} passwordLabel={t('login.password')} logIn={callbacks.onLogin}/>
        </div>
        </>
    )
}

export default memo(Login)