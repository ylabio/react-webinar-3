import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AccountBlock from '../../components/account-block'
import Head from '../../components/head'
import LoginCard from '../../components/login-card'
import PageLayout from '../../components/page-layout'
import LocaleSelect from '../../containers/locale-select'
import Navigation from '../../containers/navigation'
import useInit from '../../hooks/use-init'
import useSelector from '../../hooks/use-selector'
import useStore from '../../hooks/use-store'
import useTranslate from '../../hooks/use-translate'


/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.profile.data,
    error: state.profile.error,
    url: state.router.url
  }));

  const callbacks = {
    login: useCallback(data => store.actions.profile.login(data), [store]),
    onLogout: useCallback(() => store.actions.profile.logout(), [store]),
    resetError: useCallback(() => store.actions.profile.resetError(), [store]),
    setUrl: useCallback((url) => store.actions.router.setUrl(url), [store])

  }
  useInit(() => {
    callbacks.resetError()

    if (select.user?.profile?.name && select.url) {
      navigate(select.url)
    } else if (select.user?.profile?.name && !select.url) {
      navigate('/profile')
    }

  }, [select.user?.profile?.name])


  return (
    <PageLayout>
      <AccountBlock t={t} onLogout={callbacks.onLogout} username={select.user?.profile?.name} setUrl={callbacks.setUrl}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginCard onLogin={callbacks.login} t={t} error={select.error} navigate={navigate}/>
    </PageLayout>
  );
}

export default memo(Login);
