import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import ProfileCard from '../../components/profile-card';
import LocaleSelect from '../../containers/locale-select';
import Spinner from '../../components/spinner';

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();
  
  const select = useSelector(state => ({
    user: state.user.data,
    token: state.user.token,
    waiting: state.user.waiting
  }));

  useInit(async () => {
    //console.log('Данные пользователя:', select.user);

    // есть токен, нет данных пользователя
    if (select.token && !select.user) {
      await store.actions.user.load();
      
      // Проверка после загрузки
      if (!store.getState().user.token || !store.getState().user.data) {
        navigate('/login');
      }
    }
    
    // нет токена вообще
    if (!select.token) {
      navigate('/login');
    }
    }, [select.token, select.user]); // Зависимости для повторного выполнения

    // Не рендерим ничего пока идёт проверка
    if (!select.token || !select.user) {
      return null;
    }

  return (
    <>
      <Head>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.waiting}>
          <ProfileCard
            title={t('profile.title')}
            profile={{
            name: select.user?.profile?.name || select.user?.login,
            phone: select.user?.profile?.phone,
            email: select.user?.email
            }}
            t={t}
          />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Profile);