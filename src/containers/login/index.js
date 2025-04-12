import { memo, useCallback } from "react"
import LoginForm from "../../components/login-form"
import useStore from "../../hooks/use-store"
import useTranslate from "../../hooks/use-translate";

function Login (){
    const store = useStore();
    const callbacks ={
        initAuth : useCallback( data => store.actions.auth.initAuth(data),[store]),

        initUser : useCallback( data => store.actions.user.getUser(data),[store]),
    }
    const {t} = useTranslate();
    return(
        <>
        <div>
            <LoginForm buttonMessage={t('login.button')} header={t('login.enter')} loginLabel={t('login.login')} passwordLabel={t('login.password')} initUser={callbacks.initUser} initAuth={callbacks.initAuth}/>
        </div>
        </>
    )
}

export default memo(Login)