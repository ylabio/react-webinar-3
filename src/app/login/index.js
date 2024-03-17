import React, {useCallback} from 'react';
import useStore from "../../hooks/use-store";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import PageLayout from "../../components/page-layout";
import Authorization from "../../components/authorization";
import useSelector from "../../hooks/use-selector";
import AuthorizationForm from "../../components/authorization-form";
import useTranslate from "../../hooks/use-translate";

function Login(props) {
  const store = useStore();

  const select = useSelector(state => ({
    query: state.catalog.params.query,
  }));

  const callbacks = {
    // Поиск
    onInput: useCallback(query => store.actions.catalog.setParams({query}), [store])
  }
  const {t} = useTranslate();

  return (
    <PageLayout>
      <Authorization />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner >
        <AuthorizationForm value={select.query} onInput={callbacks.onInput} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default Login;