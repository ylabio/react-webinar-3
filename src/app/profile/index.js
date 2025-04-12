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
  const token = localStorage.getItem('token');

  const [user, setUser] = useState({});
  const [isLoad, setIsLoad] = useState(false);

  const linksNav = {
    in: '/login',
    me: '/profile',
    out: '/',
  };

  const select = useSelector(state => ({
    userName: state.auth.userName,
    isAuth: state.auth.isAuth,
    waiting: state.auth.waiting,
  }));

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const data = await store.actions.auth.checkAuth(token);
        setUser(data);
        setIsLoad(true);
      };
      fetchUser();
    }
  }, []);

  const callbacks = {
    onLogout: useCallback(token => store.actions.auth.logout(token), [store]),
  };

  const { t } = useTranslate();

  return (
    <>
      <Spinner active={select.waiting}>
        <ProfileHeader
          isAuth={select.isAuth}
          userName={select.userName}
          onClick={() => callbacks.onLogout(token)}
          links={linksNav}
        />
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
        <PageLayout>
          <Navigation />
          {isLoad && <ProfileInfo user={user} />}
        </PageLayout>
      </Spinner>
    </>
  );
}

export default memo(Profile);
