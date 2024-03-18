import React, {useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Authorization from "../../components/authorization";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import UserProfile from "../../components/user-profile";
import {Navigate} from "react-router-dom";

function Profile(props) {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.user,
    isAuth: state.user.isAuth,
    waiting: state.user.waiting
  }));

  const callbacks = {
    // Выход из профиля
    onLogout: useCallback(() => store.actions.user.signOut(), [store]),
  }

  const {t} = useTranslate();

  if (!select.isAuth) {
    return (<Navigate to={'/'} />)
  }

  return (
    <PageLayout>
      <Authorization login={select.user?.profile?.name} isAuth={select.isAuth}
                     title={select.isAuth ? 'Выход' : 'Вход'} onLogout={callbacks.onLogout} />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <UserProfile user={select.user} />
      </Spinner>
    </PageLayout>
  );
}

export default Profile;