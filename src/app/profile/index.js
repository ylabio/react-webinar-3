import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import ProfileCard from '../../components/profile-card'

/**
 * Страница авторизации
 */
function Profile() {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.data,
    waiting: state.user.waiting,
  }));

  useInit(() => {
    store.actions.user.loadUserInfo();  
  }, []);

  const { t } = useTranslate();

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.waiting}>
          <ProfileCard user={select.user} t={t}/>
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Profile);
