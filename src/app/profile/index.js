import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AccountBlock from '../../components/account-block'
import Head from '../../components/head'
import PageLayout from '../../components/page-layout'
import ProfileCard from '../../components/profile-card'
import Spinner from '../../components/spinner'
import LocaleSelect from '../../containers/locale-select'
import Navigation from '../../containers/navigation'
import useInit from '../../hooks/use-init'
import useSelector from '../../hooks/use-selector'
import useStore from '../../hooks/use-store'
import useTranslate from '../../hooks/use-translate'


function Profile() {
  const store = useStore();
  const navigate = useNavigate()
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.users.data,
    waiting: state.users.waiting
  }));

  useInit(() => {
    if (!select.user?.profile?.name) {
      navigate('/login')
    }
  }, [select.user?.profile?.name])

  return (
    <PageLayout>
      <AccountBlock title={t('account.login')} />
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
