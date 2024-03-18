import { memo } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Form from "../../components/form";
import Label from "../../components/label";
import Input from "../../components/input";

function Login() {

  const {t} = useTranslate();
  return (
    <PageLayout>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Form title={t('login.btn')} btnTitle={t('login.submit')} className={'login'}>
        <Label id={'login'} title={'Логин'}/>
        <Input id={'login'} />
        <Label id={'password'} title={'Пароль'} />
        <Input id={'password'} type={'password'} />
      </Form>
    </PageLayout>
  )
}

export default memo(Login);