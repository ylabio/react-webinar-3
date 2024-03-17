import {memo} from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import AuthLogin from '../../containers/auth-login';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import ProfileData from '../../components/profile-data';
import Spinner from '../../components/spinner';

/**
 * Cтраница профиля пользователя
 */

function Profile () {

  const store = useStore();

  useInit(() => {
    store.actions.login.getDataUser();
  }, [], true);

  const {t} = useTranslate();

  const select = useSelector(state => ({
    waiting: state.login.waiting,
    profile: state.login.profile
  }));

  return (
    <PageLayout>
      <AuthLogin/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileData 
          title={t('profile.title')} 
          name={t('profile.name')} 
          telephone={t('profile.telephone')} 
          profile={select.profile}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);