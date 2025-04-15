import { memo, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ProfileCard from '../../components/profile-card';

/**
 * Страница профиля
 */
function Profile() {
  const store = useStore();

  const select = useSelector(state => ({
    profile: state.profile.profile,
    waiting: state.profile.waiting,
  }));

  useEffect(() => {
    // Загружаем только если ещё не загружено
    if (!select.profile) {
      store.actions.profile.load();
    }
  }, [select.profile, store]);

  const { t } = useTranslate();
  return (<>
    <Head title={t('title')}>
    </Head>
    <PageLayout>
      <Navigation />
      <Spinner active={select.waiting}>
        {select.profile && <ProfileCard user={select.profile} />}
      </Spinner>
    </PageLayout>
  </>
  );
}

export default memo(Profile);
