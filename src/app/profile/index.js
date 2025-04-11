import { memo,  useEffect } from 'react';

import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import ProfileInfo from '../../components/profile-info';
import { useNavigate } from 'react-router-dom';
import AuthBar from '../../components/auth-bar';

/**
 * Страница авторизации
 */
function Profile() {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    token: state.user.token,
    user: state.user.user,
    loading: state.user.loading,
  }));

  const { t } = useTranslate();

  useEffect(() => {
    if (!select.token) {
      navigate('/login');
    }
  }, [select.token]);

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
