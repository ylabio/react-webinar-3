import { memo, useEffect } from 'react';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import HeadTop from '../../components/head-top';
import ProfileCard from '../../components/profile-card';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function Profile() {
  const { t } = useTranslate();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    token: state.auth.token,
    user: state.auth.user,
    waiting: state.auth.waiting,
  }));

  useEffect(() => {
    if (!select.token) {
      navigate('/login');
    }
  }, [select.token]);

  return (
    <>
      <HeadTop />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <ProfileCard user={select.user} />
      </PageLayout>
    </>
  );
}

export default memo(Profile);
