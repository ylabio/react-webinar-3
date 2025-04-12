import { memo } from 'react';
import useStore from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import LoginEntry from '../../containers/login-entry';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ProfileCard from '../../components/profile-card';

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */

function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }

  useInit(() => {
    store.actions.user.load();
  }, [store]);

  const select = useSelector(state => ({
    user: state.user.data,
    waiting: state.user.waiting,
  }));
  
  const { t } = useTranslate();

  return (
    <>
      <LoginEntry />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Spinner active={select.waiting}>
          <Navigation />
          <ProfileCard user={select.user} />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Profile);
