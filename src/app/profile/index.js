import {memo, useCallback, useMemo} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginHeader from '../../containers/login-header';
import Spinner from '../../components/spinner';
import ProfileInfo from '../../components/profile-info';

/**
 * Страница профиля
 */
function Profile() {
  const store = useStore();
  const navigate = useNavigate()

  const select = useSelector(state => ({
    token: state.login.token,
    profile: state.profile.data,
    waiting: state.profile.waiting,
    error: state.profile.error
  }));

  console.log(select.profile);

  useInit(() => {
    if(!select.token) navigate('/')
    store.actions.profile.load(select.token)
  }, [select.token]);


  const {t} = useTranslate();

  return (
    <PageLayout>
      <LoginHeader />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileInfo profile={select.profile} t={t} error={select.error} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
