import { memo, useCallback, useMemo, useEffect } from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import Header from '../../containers/header';
import UserInfo from '../../components/user-info';
import { useNavigate } from 'react-router-dom';

/**
 * Страница пользователя
 */
function Profile() {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isLoggedIn: state.user.isLoggedIn,
    userData: state.user.userData
  }));

  const { t } = useTranslate();


  useEffect(() => {
    if (!select.isLoggedIn) {
      navigate('/login');
    }
  }, [select.isLoggedIn]);

  return (
    <>
      <Header />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
          {select.userData && <UserInfo info={select.userData} t={t} />}
      </PageLayout>
    </>
  );
}

export default memo(Profile);
