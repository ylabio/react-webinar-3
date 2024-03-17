import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import { memo, useCallback, useEffect, useState } from "react";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import AuthContainer from "../../containers/auth-container";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Form from "../../components/form";
import Label from "../../components/label";
import { useNavigate } from "react-router-dom";

function Login() {
    const store = useStore();
    const {t} = useTranslate();
    const navigate = useNavigate() 

    const [values, setValues] = useState({
        login: "",
        password: ""
    })

    const select = useSelector(state => ({
      errorMessage: state.authorization.errorMessage,
      token: state.authorization.token
    }));

    useEffect(() => {
      if (select.token) {
        navigate('/profile')
      }
    }, [select.token])

    const callbacks = {
      onChange: useCallback((name, value) => {setValues(state => ({...state, [name]: value}))}, []),
      onSubmit: useCallback(e => {
        e.preventDefault();
        store.actions.authorization.signIn(values);
      }, [values])
    }

    return (
    <PageLayout>
        <AuthContainer />
        <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Form
        title={t('signin')}
        values={values}
        onSubmit={ callbacks.onSubmit }>
        <Label
          title={t('login.login')}
          type='text'
          name='login'
          value={values.login}
          onChangeInput={callbacks.onChange}
        />
        <Label
          title={t('login.password')}
          type='password'
          name='password'
          value={values.password}
          errorMessage={select.errorMessage}
          onChangeInput={callbacks.onChange}
        />
        <button type='submit'>{t('login.submit')}</button>
      </Form>
    </PageLayout>
    )


}

export default memo(Login);