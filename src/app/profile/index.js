import { memo } from 'react';

import useTranslate from '../../hooks/use-translate';

import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import UserInfo from '../../components/user-info';

import Auth from '../../components/auth';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';

function Profile() {
  const { t } = useTranslate();
  return (
    <>
      <Auth />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <UserInfo />
      </PageLayout>
    </>
  );
}

export default memo(Profile);
