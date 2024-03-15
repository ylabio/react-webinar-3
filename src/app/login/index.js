import {memo, useCallback, useEffect, useState} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Input from '../../components/input';
import TopMenu from '../../containers/top-menu';
import InputLayout from '../../components/input-layout';
import Form from '../../components/form';


function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();
  const [data, setData] = useState({login: '', password: ''})

  const select = useSelector(state => ({
    status: state.login.status,
    error: state.login.error
  }));

  const callbacks = {
    onSubmit: useCallback((e, dataForm) => {
      e.preventDefault();
      store.actions.login.signIn(dataForm)
    }, []),
    onChange: useCallback((value, name) => {
      setData(prev => ({...prev, [name]: value}))
    }, [store]),
  }

  useEffect(() => {
    store.actions.login.reset()
    if(select.status) {
    const back = location.state?.come_back && location.pathname !== location.state?.come_back
        ? location.state?.come_back
        : '/';
      navigate(back);
    }
  }, [select.status])

  return (
    <PageLayout>
      <TopMenu/>
      <Head title='Магазин'>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Form onSubmit={callbacks.onSubmit} dataForm={data}>
        <InputLayout label='Логин'>
          <Input
            type='text'
            name='login'
            value={data.login}
            onChange={callbacks.onChange}/>
        </InputLayout>
        <InputLayout label='Пароль'>
          <Input
            type='password'
            name='password'
            value={data.password}
            onChange={callbacks.onChange}/>
        </InputLayout>
        {select.error && <InputLayout error={select.error}/>}
        <button type='submit'>Войти</button>
      </Form>
    </PageLayout>
  );
}

export default memo(Login);