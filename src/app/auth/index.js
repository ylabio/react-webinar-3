import {memo} from 'react'
import PageLayout from '../../components/page-layout'
import HeaderAuth from '../../containers/header-auth'
import Head from '../../components/head'
import Navigation from '../../containers/navigation'
import useTranslate from '../../hooks/use-translate'
import LocaleSelect from '../../containers/locale-select'
import LoginContainer from '../../containers/login-container'
import useInit from '../../hooks/use-init'
import useStore from '../../hooks/use-store'

function Auth() {
  const {t} = useTranslate();

  const store = useStore();

  useInit(() => {
    store.actions.auth.getUser();
  }, [], true);

  return (
    <PageLayout>
      <HeaderAuth />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginContainer />

    </PageLayout>
  )
}

export default memo(Auth)