import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import {memo} from 'react'
import useTranslate from "../../hooks/use-translate";
import AuthForm from "../../containers/auth-form";
import HeadAuthContainer from "../../containers/head-auth-container";



function Login(){
  
  const {t} = useTranslate();

  return (
    <PageLayout>
    <HeadAuthContainer/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <AuthForm />
    </PageLayout>
  )
}

export default memo(Login);




