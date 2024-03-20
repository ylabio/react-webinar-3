import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AccountBlock from '../../components/account-block'
import Head from '../../components/head'
import PageLayout from '../../components/page-layout'
import ProfileCard from '../../components/profile-card'
import Spinner from '../../components/spinner'
import LocaleSelect from '../../containers/locale-select'
import Navigation from '../../containers/navigation'
import { useAuthorized } from '../../hooks/use-authorized'
import useSelector from '../../hooks/use-selector'
import useStore from '../../hooks/use-store'
import useTranslate from '../../hooks/use-translate'


function Profile() {
  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.profile.data,
    waiting: state.profile.waiting,
  }));

  const callbacks = {
    onLogout: useCallback(() => store.actions.profile.logout(), [store]),
    setUrl: useCallback((url) => store.actions.router.setUrl(url), [store])

  }

  useAuthorized('/login', select.user?.profile?.name)

  return (
    <PageLayout>
      <AccountBlock t={t} username={select.user?.profile?.name} onLogout={callbacks.onLogout} setUrl={callbacks.setUrl}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileCard props={select.user}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
