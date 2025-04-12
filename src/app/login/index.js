import { memo, useCallback } from 'react';
import useTranslate from '../../hooks/use-translate';
import useTitle from '../../hooks/use-title';
import useStore from '../../hooks/use-store';

import AuthLink from '../../components/auth-link';
import AuthForm from '../../components/auth-form';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';

import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';

function Login() {
  const store = useStore();
  const { t } = useTranslate();

  useTitle(t('title'));

  const callbacks = {
    updateUser: useCallback(() => store.actions.user.initParams(), [store]),
  };

  return (
    <>
      <AuthLink t={t} />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <AuthForm t={t} onUpdate={callbacks.updateUser} />
      </PageLayout>
    </>
  );
}

export default memo(Login);
