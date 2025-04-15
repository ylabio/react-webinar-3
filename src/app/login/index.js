import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import FormContainer from '../../containers/form-container';
import SectionHeader from '../../components/section-header';
import useStore from '../../hooks/use-store';

/**
 * Страница входа пользователя
 */
function Login() {

  const {t} = useTranslate();

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <PageLayout>
        <Navigation/>
        <SectionHeader title={t('auth.signIn')} padding={true}/>
        <FormContainer/>
      </PageLayout>
    </>
  );
}

export default memo(Login);
