import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import ProfileList from '../../components/profile-list';
import LocaleSelect from '../../containers/locale-select';
import useSelector from '../../hooks/use-selector';

/**
 * Контейнер страницы профиля (умный компонент)
 */
function Profile() {
  const store = useStore();
  const { t } = useTranslate();

  // Получаем данные из стора
  const { data, loading } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);

  // Инициализация загрузки данных при монтировании
  useInit(() => {
    store.actions.profile.loadProfile();
  });

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <ProfileList
          name={user?.profile?.name || data?.name}
          phone={data?.phone}
          email={user?.email || data?.email}
          isLoading={loading}
          t={t}
        />
      </PageLayout>
    </>
  );
}

export default memo(Profile);
