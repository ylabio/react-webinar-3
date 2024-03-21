import {memo} from 'react';
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
import { getCurrentToken } from '../../utils';

/**
 * Страница профиля
 */
function Profile() {
  const store = useStore();

  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.profile.waiting,
    error: state.profile.error
  }));

  useInit(() => {
    const token = getCurrentToken()
    store.actions.login.validateToken(token)

    store.actions.profile.load(token)
  }, []);


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
