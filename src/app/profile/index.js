import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../containers/head-container';
import Navigation from '../../containers/navigation';
import ProfileCard from '../../components/profile-card';
import LocaleSelect from '../../containers/locale-select';
import Spinner from '../../components/spinner';

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();
  
  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.profile.waiting,
    token: state.user.token
  }));

  useInit(async () => {
    //console.log('Данные пользователя:', select.user);

    if (select.token) {
      if (!select.profile) {
        // Загружаем профиль если есть токен но нет данных
        await store.actions.profile.load();
      }
      
      // Перенаправляем если после загрузки всё ещё нет данных
      if (!store.getState().profile.data) {
        navigate('/login');
      }
    } else {
      // Нет токена - сразу на логин
      navigate('/login');
    }
  }, [select.token, select.profile]);

  // Не рендерим ничего пока идёт проверка авторизации
  if (!select.token || !select.profile) {
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
              name: select.profile?.profile?.name || select.profile?.login,
              phone: select.profile?.profile?.phone,
              email: select.profile?.email
            }}
            t={t}
          />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Profile);