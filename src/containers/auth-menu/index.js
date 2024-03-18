import { useCallback, useMemo } from 'react'
import useSelector from '../../hooks/use-selector'
import SideLayout from '../../components/side-layout'
import AuthButton from '../../components/auth-button'
import { useNavigate, Link } from 'react-router-dom'
import useStore from '../../hooks/use-store'
import useTranslate from '../../hooks/use-translate';

const AuthMenu = () => {
  const navigate = useNavigate()
  const store = useStore()
  const {t} = useTranslate();

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
          <AuthButton onAction={callbacks.onLogout} buttonTitle={t('auth.signout')}/>
        </>
      :
        <AuthButton onAction={callbacks.onLogin} buttonTitle={t('auth.signin')}/>
      }
    </SideLayout>
  )
}

export default AuthMenu