import {memo, useState} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import TopMenu from '../../containers/top-menu';
import FormBody from '../../components/form-body';
import FormInput from '../../components/form-input';
import useForm from '../../hooks/use-Form';

/**
 * Главная страница - первичная загрузка каталога
 */
function Login() {

  const store = useStore();

  const [message, setMessage] = useState("");
  const [valueForm, handleChanges] = useForm({
    login: "",
    password: "",
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    store.actions.auth.signIn(valueForm)
    .catch((err) => {
      setMessage(err.message);
    })
  };

  const {t} = useTranslate();

  return (
    <PageLayout>
      <TopMenu/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <FormBody
        onSubmit={handlerSubmit}
        title='Вход'
        message={message}
        isMessage={true}
        btnName={'Войти'}
      >
        <FormInput
        onChange={handleChanges}
        value={valueForm.login || ''}
        title={'Логин'}
        name={'login'}
        />
        <FormInput
        onChange={handleChanges}
        value={valueForm.password || ''}
        title={'Пароль'}
        name={'password'}
        type={'password'}
        />
      </FormBody>
    </PageLayout>
  );
}

export default memo(Login);
