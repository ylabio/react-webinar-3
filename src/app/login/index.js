import {memo, useCallback, useMemo} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from '../../hooks/use-translate';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import AuthPanel from '../../containers/auth-panel';
import FullForm from '../../containers/full-form';



function Login() {

    const store = useStore();

    const { t } = useTranslate()
    // useInit(() => {
    //   store.actions.article.load(params.id);
    // }, [params.id]);
  
  
    return (
      <PageLayout>
        <AuthPanel/>
        <Head title={t('title')}>
          <LocaleSelect/>
        </Head>
        <Navigation/>
        <FullForm></FullForm>
      </PageLayout>
    );
}

export default memo(Login);
