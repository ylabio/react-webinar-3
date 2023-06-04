import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import AuthForm from '../../components/auth-form';
import TopHead from '../../components/top-head';
import AuthLink from '../../components/auth-link';

function Auth() {
  const store = useStore();

  const select = useSelector(state => ({
    article: state.article.data,
    user: state.auth.user,
    wait: state.auth.wait,
    err: state.auth.err,
  }));

  const callbacks = {
   signIn: useCallback((valueLog, valuePass) => store.actions.auth.signIn(valueLog, valuePass), [store] ),
   getUserToken: useCallback(() => store.actions.auth.getUserToken(), [store])
  }

  return (
    <PageLayout>
      <TopHead>
        <AuthLink user={select.user}/>
      </TopHead>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.wait}>
        <AuthForm signIn={callbacks.signIn} user={select.user} err={select.err}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Auth);
