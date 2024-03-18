import {memo} from 'react';
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import Login from '../../containers/login';
import LoginFormContainer from '../../containers/login-form-container';

/**
 * Страница авторизации
 */
function LoginPage() {

  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.user.data
  }));

  useInit(() => {
    if (select.user && Object.keys(select.user).length !== 0) {
      navigate('/profile');
      return null;
    }
  }, [select.user, navigate])

  const {t} = useTranslate();

  return (
    <PageLayout>
      <Login />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginFormContainer />
    </PageLayout>
  );
}

export default memo(LoginPage);
