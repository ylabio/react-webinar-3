import React, {memo} from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import ProfileInfo from '../../components/profile-info';
import AuthMenu from "../../containers/auth-menu";
import Navigation from "../../containers/navigation";
import LocaleSelect from '../../containers/locale-select';
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import Spinner from '../../components/spinner';

const UserProfile = () => {

	const store = useStore()

	const select = useSelector(state => ({
    profile: state.profile.data,
		waiting: state.profile.waiting
  }));

	useInit(() => {
    store.actions.profile.getProfile();
  }, []);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthMenu/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
			<Spinner active={select.waiting}>
   	    <ProfileInfo user={select.profile} t={t} />
			</Spinner>
    </PageLayout>
  )
};

export default memo(UserProfile);