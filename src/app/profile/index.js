import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import AuthBar from '../../components/auth-bar';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import ProfileCard from '../../components/profile-card';

/**
 * Страница информации о пользователе
 */
function Profile() {
  const navigate = useNavigate();
  const store = useStore();
  const [params, setParams] = useState([]);

  const select = useSelector(state => ({
    user: state.session.user,
  }));

  const callbacks = {
    // Выход пользователя
    onLogOut: useCallback(() => {
      store.actions.session.logOut();
      navigate('/');
    }, [store]),
  };

  const { t } = useTranslate();

  useEffect(() => {
    if (select.user) {
      console.log(select.user?.profile?.name)
      setParams([
        {title: t('name'), value: select.user?.profile?.name},
        {title: t('telephone'), value: select.user?.profile?.phone},
        {title: t('email'), value: select.user?.email},
      ]);
    }
  }, [select.user, t]);

  return (
    <>
      <AuthBar
        buttonTitle={select.user ? t('logOut') : t('logIn')}
        userTitle={select.user?.username}
        onClickButton={select.user ? callbacks.onLogOut : callbacks.redirectToLogin}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <ProfileCard title={t('profile')} params={params} />
      </PageLayout>
    </>
  );

}

export default memo(Profile);