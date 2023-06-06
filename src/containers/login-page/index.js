import { memo, useCallback, useState } from 'react'
import useStore from '../../hooks/use-store'
import useSelector from '../../hooks/use-selector'
import PageLayout from '../../components/page-layout'
import Head from '../../components/head'
import Navigation from '../../containers/navigation'
import LocaleSelect from '../../containers/locale-select'
import HeadPage from '../../components/head-page'
import LoginForm from '../../components/loginForm'
import debounce from 'lodash.debounce';

function LoginPage() {
  const store = useStore()
  const [loginUser, setLoginUser] = useState()
  const [passwordUser, setPasswordUser]= useState()
  const [valueLogin, setValueLogin] = useState()
  const [valuePassword, setValuePassword] = useState()

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
    valueLogin && valuePassword && callbacks.getAuthorization(valueLogin, valuePassword)
    select.authorization && (window.location.href = '/')
  }

  // Обработчик изменений в поле
  const onChange = (e, name) => {
    name === 'login' && setValueLogin(e.target.value)
    name === "password" && setValuePassword(e.target.value)
  };

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
        onChange={onChange}
        error={select.error}
      />
    </PageLayout>
  )
}

export default memo(LoginPage)
