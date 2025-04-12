import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from "../../../hooks/use-store";
import useInit from "../../../hooks/use-init";
import useTranslate from "../../../hooks/use-translate";
import useSelector from "../../../hooks/use-selector";

import Head from "../../../components/head";
import LocaleSelect from "../../../containers/locale-select";
import PageLayout from "../../../components/page-layout";
import Navigation from "../../../containers/navigation";
import ProfileInfo from "../../../components/user/profile-info";
import AuthInfo from "../../../components/user/auth-info";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  useInit(
    () => {
      store.actions.user.checkAuth();
    },
    [],
    true,
  );

  const select = useSelector(state => ({
    auth: state.user.isAuth,
    user: state.user.data,
    isLoading: state.user.isLoading,
  }));


  useEffect(() => {
    if (select.auth === false) {
      navigate('/login');
    }
  }, [select.auth, navigate]);

  return (
    <>
      <AuthInfo />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
          <ProfileInfo user={select.user}/>
      </PageLayout>
    </>
  );
}

export default memo(Profile);
