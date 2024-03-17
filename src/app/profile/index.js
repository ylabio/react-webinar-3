import {memo, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthHeader from '../../components/auth-header';
import ProfileInfo from '../../components/profile-info';

function Profile() {

  const store = useStore();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useInit(() => {
    if (token) {
      store.actions.user.initUserProfile(token);
    } else {
      navigate('/');
    }
  }, [], true);

  const callbacks = {
    onSignOut: useCallback(token => store.actions.user.signOut(token, navigate), [store]),
  }

  const select = useSelector((state) => ({
    userName: state.user.profile.userName,
    phone: state.user.profile.phone,
    email: state.user.profile.email
  }));

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthHeader
        token={token}
        buttonTitle='Выход'
        login='/login'
        userName={select.userName}
        onSignOut={callbacks.onSignOut}
      />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileInfo
        userName={select.userName}
        phone={select.phone}
        email={select.email}
      />
    </PageLayout>
  );
}

export default memo(Profile);
