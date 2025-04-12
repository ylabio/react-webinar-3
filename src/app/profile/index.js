import { memo, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import UserNavigation from '../../containers/user-navigation';
import UserProfile from '../../components/user-profile';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../../utils';

function Profile() {
  const store = useStore();
  const { t } = useTranslate();

  let navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.user.profile,
    waiting: state.user.waiting,
  }));

  useEffect(() => {
    if (!select.user && !isAuth()) {
      navigate('/login');
    }
  }, [select.user, isAuth(), navigate]);

  return (
    <>
      <UserNavigation />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.waiting}>
          <UserProfile t={t} user={select.user} />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Profile);
