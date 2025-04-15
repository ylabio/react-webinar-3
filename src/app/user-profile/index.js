import React, {memo, useCallback, useEffect, useMemo} from 'react';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import UserProfileCard from '../../components/user-profile-card';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useAuthGuard from "../../hooks/use-auth-guard";

const UserProfile = () => {
  const store = useStore();

  const select = useSelector(state => ({
    profile: state.user.profile,
    token: state.session.token,
  }));

  useAuthGuard();

  const callbacks = {
    loadProfileData: useCallback((token) => {
      store.actions.user.loadProfile(token);
    }, [store]),
  };

  useEffect(() => {
    callbacks.loadProfileData(select.token);
  }, [store]);

  const options = {
    userProps: useMemo(
      () => [
        { title: 'Имя', value: select.profile.name },
        { title: 'Телефон', value: select.profile.phone },
        { title: 'Email', value: select.profile.email },
      ],
      [select.profile],
    ),
  };

  return (
    <>
      <Head title={'Магазин'}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <UserProfileCard userProps={options.userProps} />
      </PageLayout>
    </>
  );
};

export default memo(UserProfile);
