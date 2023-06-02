import { memo, useState } from 'react'
import useStore from '../../hooks/use-store'
import useSelector from '../../hooks/use-selector'
import useTranslate from '../../hooks/use-translate'
import useInit from '../../hooks/use-init'
import PageLayout from '../../components/page-layout'
import Head from '../../components/head'
import Navigation from '../../containers/navigation'
import LocaleSelect from '../../containers/locale-select'
import HeadPage from '../../components/head-page'
import LoginForm from '../../components/loginForm'

function LoginPage() {
  const [error, setError] = useState('')

  const tokenUser = localStorage.getItem('token')

  const handleLogin = () => {
    const login = localStorage.getItem('login')
    const password = localStorage.getItem('password')
    async function getAuthorization() {
      try {
        const response = await fetch('/api/v1/users/sign', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: login,
            password: password,
          }),
        })

        const json = await response.json()
        localStorage.setItem('token', json.result.token);
        setError('')
      } catch (e) {
        setError('Неверный логин или пароль')
      }
    }
    getAuthorization()
  }

  const onChangeInput = (props) => {
    props.name === 'login' && localStorage.setItem('login', props.value)
    props.name === 'password' && localStorage.setItem('password', props.value)
  }

  return (
    <PageLayout head={<HeadPage token={tokenUser}/>}>
      <Head title="Магазин">
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm onLogin={handleLogin} error={error} onChange={onChangeInput} />
    </PageLayout>
  )
}

export default memo(LoginPage)
