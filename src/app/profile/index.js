import { memo } from 'react';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import ProfileCard from '../../components/profile-card';
import LoginMenu from '../../components/login-menu';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';

function Profile() {
  const { t } = useTranslate();
  const store = useStore();

  useInit(() => {
    store.actions.user.getUser();
  }, []);

  const select = useSelector(state => ({
    name: state.user.name,
    phone: state.user.phone,
    email: state.user.email,
  }));

  return (
    <>
      <LoginMenu />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <ProfileCard t={t} name={select.name} phone={select.phone} email={select.email} />
      </PageLayout>
    </>
  );
}

export default memo(Profile);
