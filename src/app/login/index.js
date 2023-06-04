import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import {memo} from 'react'
import useTranslate from "../../hooks/use-translate";
import AuthForm from "../../containers/auth-form";
import HeadAuth from "../../components/head-auth";



function Login(){
  
  const {t} = useTranslate();

  return (
    <PageLayout>
    <HeadAuth/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <AuthForm />
    </PageLayout>
  )
}

export default memo(Login);




