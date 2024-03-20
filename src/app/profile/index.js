import {memo} from 'react';
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthHeader from '../../components/auth-header';
import ProfileInfo from '../../components/profile-info';

function Profile(props) {

  const store = useStore();

  useInit(() => {
    store.actions.profile.initUserProfile(props.token);
  }, [store], true);

  const callbacks = {
    onSignOut: () => props.onLogout(),
  }

  const select = useSelector((state) => ({
    phone: state.profile.phone,
    email: state.profile.email
  }));

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthHeader
        token={props.token}
        buttonTitle='Выход'
        login='/login'
        userName={props.userName}
        onSignOut={callbacks.onSignOut}
      />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileInfo
        userName={props.userName}
        phone={select.phone}
        email={select.email}
      />
    </PageLayout>
  );
}

export default memo(Profile);
