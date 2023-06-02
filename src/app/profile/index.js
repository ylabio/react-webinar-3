import {memo} from 'react'
import PageLayout from '../../components/page-layout'
import HeaderAuth from '../../containers/header-auth'
import Head from '../../components/head'
import LocaleSelect from '../../containers/locale-select'
import useTranslate from '../../hooks/use-translate'
import Navigation from '../../containers/navigation'
import Spinner from '../../components/spinner'
import ProfileContainer from '../../containers/profile-container'

function Profile() {
  const {t} = useTranslate();

  return (
    <PageLayout>
    <HeaderAuth />
    <Head title={t('title')}>
      <LocaleSelect />
    </Head>
    <Navigation />

    <ProfileContainer />
  </PageLayout>
  )
}

export default memo(Profile)