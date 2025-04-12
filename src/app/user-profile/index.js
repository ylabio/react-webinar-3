import React, {memo, useCallback, useEffect, useMemo} from 'react';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import UserProfileCard from '../../components/user-profile-card';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

const UserProfile = () => {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuth: !!state.user.isAuth,
    profile: state.user.profile,
  }));

  useEffect(() => {
    if (!select.isAuth) {
      navigate('/login', { replace: true });
    }
  });

  const callbacks = {
    loadProfileData: useCallback(() => {
      store.actions.user.loadProfile();
    }, [store]),
  };

  useEffect(() => {
    callbacks.loadProfileData();
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
