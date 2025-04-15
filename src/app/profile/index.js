import {memo, useEffect,} from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import LoginMenu from '../login-menu';
import ProfileCard from '../../components/profile-card';

function Profile() {
  const store = useStore();

  useInit(() => {}, []);

  useEffect(() => {
    document.title = 'Магазин / Профиль';
  }, []);

  const select = useSelector(state => ({
    userData: state.authorization.userData,
  }));

  const { t } = useTranslate();

  return (
    <>
      <LoginMenu />
      <Head title="Магазин">
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <ProfileCard userData={select.userData} />
      </PageLayout>
    </>
  );
}

export default memo(Profile);
