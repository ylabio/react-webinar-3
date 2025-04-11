import { memo } from 'react';
import Auth from '../../components/auth';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import AuthForm from '../../components/auth-form';

function Login() {
  const { t } = useTranslate();

  return (
    <>
      <Auth />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <AuthForm />
      </PageLayout>
    </>
  );
}

export default memo(Login);
