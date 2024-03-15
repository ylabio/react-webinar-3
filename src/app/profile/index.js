import {memo, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useAuth from '../../hooks/use-auth';
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import AppAuth from '../../containers/app-auth';
import UserProfile from '../../containers/user-profile';

/**
 * Страница профиля юзера
 */
function Profile() {

  const {t} = useTranslate();

  const navigate = useNavigate();

  const {isAuthorized} = useAuth();

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login', { replace: true });
    }
  }, [isAuthorized])

  return (
    <PageLayout>
      <AppAuth />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <UserProfile />
    </PageLayout>
  );
}

export default memo(Profile);
