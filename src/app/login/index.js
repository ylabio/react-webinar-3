import {useEffect, useCallback, useState, memo} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import AuthMenu from "../../containers/auth-menu";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import AuthForm from "../../components/auth-form";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function Login() {

	const [data, setData] = useState({login: "", password: ""});
	const navigate = useNavigate();
  const location = useLocation();
	const store = useStore();

  const select = useSelector(state => ({
    error: state.auth.error,
		user: state.auth.user
  }));

	const callbacks = {
    onSubmit: useCallback((e)=> {
      e.preventDefault();
      store.actions.auth.login(data);
    }, [data]),
    onChange: useCallback((name, value) => {
      setData(prev => ({...prev, [name]: value}));
    }, [store]),
  }

	useEffect(() => {
    if (select.user) {
      const path = location.state?.backNavigate && location.state?.backNavigate !== location.pathname ? location.state?.backNavigate : '/';
      navigate(path)
    }
  }, [select.user]);

	const {t} = useTranslate();

  return (
    <PageLayout>
			<AuthMenu/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
			<AuthForm t={t}
								data={data}
								error={select.error}
								onInputChange={callbacks.onChange}
								onSubmit={callbacks.onSubmit}/>
    </PageLayout >)
}

export default memo(Login);