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


function User() {
  const store = useStore();
  const callbacks = {
    signOut: useCallback(() => store.actions.auth.signOut(), [store]),
  }


  const select = useSelector(state => ({
    loggedIn: state.auth.loggedIn,
    waiting: state.article.waiting,
    user: state.auth.user,
  }));

  const {t} = useTranslate();


  useInit(() => {
    console.log('произошел феч')
    store.actions.auth.fetchUser()
  }, []);

  if (!select.loggedIn) return <Navigate to={'/login'}/>

  return (
    <PageLayout>
      <UserPanel userName={select.user?.profile?.name} profile={'/profile'} callBack={callbacks.signOut}
                 loggedIn={select.loggedIn} title={t('exit')}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <UserCard t={t} user={select.user}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(User);
