import { memo } from 'react';

import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useTitle from '../../hooks/use-title';
import useStore from '../../hooks/use-store';

import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import UserInfo from '../../components/user-info';

import AuthLink from '../../components/auth-link';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';

function Profile() {
  const { t } = useTranslate();

  const select = useSelector(state => ({
    userData: state.user.userInfo,
  }));

  useTitle(`${t('title')} / ${select.userData.name}`);
  return (
    <>
      <AuthLink />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <UserInfo userData={select.userData} t={t} />
      </PageLayout>
    </>
  );
}

export default memo(Profile);
