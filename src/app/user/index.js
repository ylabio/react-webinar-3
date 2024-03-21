import {memo, useCallback} from 'react';
import {Navigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import UserPanel from "../../components/user-panel";
import UserCard from "../../components/user-card";
import useInit from "../../hooks/use-init";
import AuthorizedRoute from "../../containers/autorized-route";


function User() {
  const store = useStore();

  const select = useSelector(state => ({
    loggedIn: state.auth.loggedIn,
    waiting: state.article.waiting,
    user: state.user.user,
    token: state.auth.token,
  }));

  const callbacks = {
    signOut: useCallback(() => store.actions.auth.signOut(), [store]),
  }

  useInit(() => {
    store.actions.user.fetchUser(select.token);
  }, [select.loggedIn, select.token]);

  const {t} = useTranslate();


  return (
    <PageLayout>
      <UserPanel userName={select.user?.profile?.name} profile={'/profile'} callBack={callbacks.signOut}
                 loggedIn={select.loggedIn} title={t('exit')}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <AuthorizedRoute login={'/login'}>
          <UserCard t={t} user={select.user}/>
        </AuthorizedRoute>
      </Spinner>
    </PageLayout>
  );
}

export default memo(User);
