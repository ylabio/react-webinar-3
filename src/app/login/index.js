import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../containers/head-container';
import Navigation from '../../containers/navigation';
import LoginForm from '../../containers/login-form-container';
import LocaleSelect from '../../containers/locale-select';

function Login() {
  const { t } = useTranslate();

  return (
    <>
      <Head>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm t={t} />
      </PageLayout>
    </>
  );
}

export default memo(Login);