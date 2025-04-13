import React, { useEffect, useCallback } from 'react';

import UserInfoLayout from '../../components/user-info-layout';
import UserInfo from '../../containers/user-info';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import UserCard from '../../components/user-card';

import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useCheckAuth from '../../hooks/use-check-auth';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    const { status, token } = useCheckAuth();

    const store = useStore();
    const { userProfile } = useSelector(state => state.profile);

    const callbacks = {
        getProfile: useCallback(token => store.actions.profile.fetchProfile(token)),
    }

    useEffect(() => {
        if (status && token) {
            callbacks.getProfile(token);
        } else {
            navigate('/login');
        }
    }, [status, token])

    return (
        <>
            <UserInfoLayout>
                <UserInfo />
            </UserInfoLayout>

            <Head title={'Магазин'}>
                <LocaleSelect />
            </Head>

            <PageLayout>
                <Navigation />
                <UserCard {...userProfile} />
            </PageLayout>
        </>
    )
}

export default React.memo(Profile);