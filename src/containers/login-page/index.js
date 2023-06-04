import { memo, useCallback } from 'react'
import useStore from '../../hooks/use-store'
import useSelector from '../../hooks/use-selector'
import PageLayout from '../../components/page-layout'
import Head from '../../components/head'
import Navigation from '../../containers/navigation'
import LocaleSelect from '../../containers/locale-select'
import HeadPage from '../../components/head-page'
import LoginForm from '../../components/loginForm'

function LoginPage() {
  const store = useStore()

  const select = useSelector((state) => ({
    authorization: state.user.authorization,
    nameUser: state.user?.user?.user?.profile?.name,
    error: state.user?.error,
  }))

  const userName = localStorage.getItem('userName')

  const callbacks = {
    // Авторизация
    getAuthorization: useCallback(
      (login, password) => store.actions.user.getAuthorization(login, password),
      [store]
    ),
    // Выход
    deleteUser: useCallback(() => store.actions.user.deleteUser(), [store]),
  }

  const handleLogin = () => {
    const loginUser = localStorage.getItem('login')
    const passwordUser = localStorage.getItem('password')
    loginUser &&
      passwordUser &&
      callbacks.getAuthorization(loginUser, passwordUser)
  }

  const onChangeInput = (props) => {
    props.name === 'login' && localStorage.setItem('login', props.value)
    props.name === 'password' && localStorage.setItem('password', props.value)
  }

  return (
    <PageLayout
      head={
        <HeadPage
          authorization={select.authorization}
          exit={callbacks.deleteUser}
          userName={userName}
        />
      }
    >
      <Head title="Магазин">
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        onLogin={handleLogin}
        onChange={onChangeInput}
        error={select.error}
      />
    </PageLayout>
  )
}

export default memo(LoginPage)
