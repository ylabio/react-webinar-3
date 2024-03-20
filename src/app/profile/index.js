import { memo } from 'react';
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import Login from '../../containers/login';
import ProfileCard from '../../components/profile-card';
import Spinner from '../../components/spinner';
import useAuthentication from '../../hooks/use-authentication';
import { useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';

/**
 * Страница профиля пользователя
 */
function Profile() {

  // хук для проверки аутентификации и редиректа
  // на страницу аутентификации, в случае её отсутствия 
  useAuthentication();

  const store = useStore();

  const { id } = useParams();

  useInit(() => {
    store.actions.profile.getUser(id);
  }, [id])

  // Как и просили в правках данные беру из отдельного модуля для Profile
  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.profile.waiting,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <Login />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard user={select.profile} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
