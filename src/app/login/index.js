import {memo, useState, useCallback, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Authorization from '../../containers/authorization';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Form from '../../components/form';
import Input from '../../components/input';
import InputLabel from '../../components/input-label';
import Spinner from '../../components/spinner';

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslate();

  const [values, setValues] = useState({
    login: '',
    password: ''
  });

  const select = useSelector(state => ({
    user: state.authorization.user,
    error: state.authorization.error,
    errorMessage: state.authorization.errorMessage,
    waiting: state.authorization.waiting
  }));

  const callbacks = {
    onFormSubmit: useCallback(formData => {
      store.actions.authorization.signIn(formData);
    }, [values]),
    onInputChange: useCallback((value, name) => {
      setValues(state => ({ ...state, [name]: value}))
    }, [])
  };

  useEffect(() => {
    if(select.error) {
      store.actions.authorization.resetError();
    }
  }, []);

  useEffect(() => {
    if(select.user && !select.error) {
      const goBackLink = location.state?.goBackLink && location.state?.goBackLink !== location.pathname ? location.state.goBackLink : '/';
      navigate(goBackLink);
    }
  }, [select.user, select.error]);

  return (
    <PageLayout>
      <Authorization/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <Form
          onSubmit={callbacks.onFormSubmit}
          error={select.error}
          errorMessage={select.errorMessage}
          formData={values}
          title={t('authorization.login')}
          submitBtnTitle={t('authorization.signin')}
        >
          <InputLabel name='login' title={t('authorization.name')}>
            <Input
              onChange={callbacks.onInputChange}
              value={values.login}
              type='text'
              name='login'
              theme='medium'
            />
          </InputLabel>
          <InputLabel name='password' title={t('authorization.password')}>
            <Input
              onChange={callbacks.onInputChange}
              value={values.password}
              type='password'
              name='password'
              theme='medium'
            />
          </InputLabel>
        </Form>
      </Spinner>
    </PageLayout>
  )
}

export default memo(Login);
