import {memo} from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import AuthHeader from '../../components/auth-header';
import useSelector from '../../hooks/use-selector';
import QuitHeader from '../../components/quit-header';
import {useEffect} from 'react';
import {useNavigate, redirect} from 'react-router-dom';

import AuthPage from '../../components/auth-page';

function Auth() {
  const store = useStore();

  const navigate = useNavigate();

  const {t} = useTranslate();

  const select = useSelector((state) => ({
    currentUser: state.profile.currentUser,
  }));

  useEffect(() => {
    if (select.currentUser) navigate(`/profile/${select.currentUser?.id}`);
  }, [select.currentUser]);

  const callbacks = {
    onSubmit: store.actions.profile.login,
    onRedirect: () => redirect(`/profile/${select.currentUser?.id}`),
  };

  return (
    <PageLayout>
      {select.currentUser ? (
        <QuitHeader
          link={`/profile/${select.currentUser.id}`}
          name={select.currentUser.name}
        />
      ) : (
        <AuthHeader link={'/login'} />
      )}
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <AuthPage
        onSubmit={callbacks.onSubmit}
        onRedirect={callbacks.onRedirect}
      />
    </PageLayout>
  );
}

export default memo(Auth);
