import { memo, useCallback } from "react"
import LoginLayout from '../../components/login-layout'
import useSelector from "../../hooks/use-selector"
import LoginContent from "../../components/login-header-content"
import useStore from "../../hooks/use-store"
import useTranslate from "../../hooks/use-translate"

const LoginHeader = () => {
  const store = useStore()
  
  const select = useSelector(state => ({
    isLoggedIn: state.login.isLoggedIn,
    username: state.login.username,
  }))

  const callbacks = {
    onLogOut: useCallback(() => store.actions.login.logOut(), [store])
  }

  const {t} = useTranslate()
  
  return (
    <LoginLayout side='end' padding='medium'>
      <LoginContent 
        isLoggedIn={select.isLoggedIn} 
        username={select.username} 
        onLogOut={callbacks.onLogOut} 
        t={t}
      />
    </LoginLayout>
  )
}

export default memo(LoginHeader)