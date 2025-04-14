import { memo, useCallback, useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import ProfileHeader from '../../components/profile-header';
import ProfileInfo from '../../components/profile-info';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import Spinner from '../../components/spinner';

function Profile() {
  const store = useStore();

  const [isLoad, setIsLoad] = useState(false);

  const select = useSelector(state => ({
    user: state.user.user,
    isAuth: state.user.isAuth,
    token: state.user.token,
    waiting: state.user.waiting,
  }));

  useEffect(() => {
    if (select.isAuth) {
      setIsLoad(true);
    }
  }, [select.isAuth]);

  const callbacks = {
    onLogout: useCallback(token => store.actions.user.logout(token), [store]),
  };

  const { t } = useTranslate();

  return (
    <>
      <Spinner active={select.waiting}>
        <ProfileHeader
          isAuth={select.isAuth}
          userName={select.user?.profile.name}
          onClick={() => callbacks.onLogout(select.token)}
        />
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
        <PageLayout>
          <Navigation />
          {isLoad && <ProfileInfo user={select.user} />}
        </PageLayout>
      </Spinner>
    </>
  );
}

export default memo(Profile);
