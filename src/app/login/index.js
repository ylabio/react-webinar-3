import {memo} from 'react';
import useTranslate from '../../hooks/use-translate';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import TopHead from '../../containers/top-head';
import LoginMain from '../../containers/login-main';

function Login() {

  const {t} = useTranslate();

  return (
    <PageLayout>
      <TopHead/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginMain/>
    </PageLayout>
  );
}

export default memo(Login);
