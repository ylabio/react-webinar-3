import {memo, useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import TopControls from '../../containers/top-controls';
import LoginForm from '../../components/login-form';

function Login() {
  const store = useStore();

  const select = useSelector(state => ({
    waiting: state.user.waiting,
    user: state.user.data,
    loginError: state.user.error,
  }));
  const initFormData = {login: '', password: ''}
  const [formData, setFormData] = useState(initFormData);

  const navigate = useNavigate();
  useEffect(() => {
    if(!select.waiting && select.user) {
      setFormData(initFormData);
      if(window.history.length > 2) {
        window.history.back();
      } else {
        navigate('/');
      }
    }
  }, [select.user, select.waiting]);

  const {t} = useTranslate();

  const callbacks = {
    onLoginFormChange: useCallback((e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
      store.actions.user.resetError();
    }, [formData, store]),
    onLoginFormSubmit: useCallback((e) => {
      e.preventDefault();
      store.actions.user.logIn(formData)
    }, [store, formData]),
  }

  return (
    <PageLayout>
      <TopControls />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <LoginForm formData={formData}
                   onChange={callbacks.onLoginFormChange}
                   onSubmit={callbacks.onLoginFormSubmit}
                   isSubmitting={select.waiting}
                   errorMessage={select.loginError?.message}
                   t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
