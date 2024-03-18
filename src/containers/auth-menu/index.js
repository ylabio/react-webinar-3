import { useCallback, useMemo } from 'react'
import useSelector from '../../hooks/use-selector'
import SideLayout from '../../components/side-layout'
import AuthButton from '../../components/auth-button'
import { useNavigate, Link } from 'react-router-dom'
import useStore from '../../hooks/use-store'

const AuthMenu = () => {
  const navigate = useNavigate()
  const store = useStore()

  const {isLoggedIn, user} = useSelector(state => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  }))

  const callbacks = {
    onLogin: useCallback(() => {navigate('/login')},[]),
    onLogout: useCallback(() => {store.actions.auth.signOut()},[]),
  }

  return (
    <SideLayout side='end' padding='small'>
      {isLoggedIn ?
        <>
          <Link to={'/profile'}>{user?.name}</Link>
          <AuthButton onAction={callbacks.onLogout} buttonTitle={'Выход'}/>
        </>
      :
        <AuthButton onAction={callbacks.onLogin} buttonTitle={'Вход'}/>
      }
    </SideLayout>
  )
}

export default AuthMenu