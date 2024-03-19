import {memo} from 'react';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Authorization from '../../containers/authorization';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import UserProfile from '../../components/userProfile';

function Profile() {
  const store = useStore();
  const {t} = useTranslate();

  useInit(async () => {
    await store.actions.profile.getUserData();
  }, []);

  const select = useSelector(state => ({
    userData: state.profile.userData,
    waiting: state.profile.waiting
  }));

  return (
    <PageLayout>
      <Authorization/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <UserProfile userData={select.userData} t={t}/>
      </Spinner>
    </PageLayout>
  );
};

export default memo(Profile);