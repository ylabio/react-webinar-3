import { memo, useEffect } from 'react';

import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import ProfileInfo from '../../components/profile-info';
import { useNavigate } from 'react-router-dom';
import AuthBar from '../../components/auth-bar';
import useStore from '../../hooks/use-store';

/**
 * Страница авторизации
 */
function Profile() {
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector(state => ({
    token: state.user.token,
    user: state.user.user,
    loading: state.user.loading,
  }));

  const { t } = useTranslate();

  useEffect(() => {
    const token = select.token;

    const checkAndRedirect = async () => {
      try {
        await store.actions.user.initUser();
        if (!token) {
          navigate('/login');
        }
      } catch {
        navigate('/login');
      }
    };

    checkAndRedirect();
  }, [navigate, store, select.token]);

  return (
    <>
      <Head TopBar={<AuthBar />} title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        {select.loading ? <>Загрузка данных</> : <ProfileInfo user={select.user} t={t} />}
      </PageLayout>
    </>
  );
}

export default memo(Profile);
