import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import AuthContainer from '../../containers/auth';
import User from '../../components/user-info';
import Navigation from '../../containers/navigation';

/**
 * Страница профиля пользователя
 */
function Profile() {
  const { t } = useTranslate();
  const { user } = useSelector(state => state.login || {});

  return (
    <>
      <AuthContainer />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <User 
          title={t('profile.title')}
          userLabel={t('user.name')}
          userPhone={t('user.phone')}
          userEmail={t('user.email')}
          userName={user?.profile.name}
          email={user?.email}
          phone={user?.profile.phone}
        />
      </PageLayout>
    </>
  );
}

export default memo(Profile);