import {memo} from 'react';
import {useNavigate} from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Header from "../../containers/header";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import UserInfo from "../../components/user-info";
import Spinner from "../../components/spinner";

/**
 * Личный кабинет пользователя
 */
function Profile() {
  const navigate = useNavigate();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.auth.user,
    token: state.auth.token,
    isLogged: state.auth.isLogged,
    waiting: state.auth.waiting,
  }));

  useInit(() => {
    if (!select.isLogged && !select.token) navigate('/');
  }, [select.isLogged, select.token, navigate])

  return (
    <PageLayout>
      <Header/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      {select.isLogged &&
        <Spinner active={select.waiting}>
          <UserInfo user={select.user}/>
        </Spinner>
      }
    </PageLayout>
  );
}

export default memo(Profile);
