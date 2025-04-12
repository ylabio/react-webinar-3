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
import { useNavigate } from 'react-router-dom';

function Profile() {
    const store = useStore();
    const navigate = useNavigate();
    const authToken = sessionStorage.getItem('authToken');

    const { userProfile } = useSelector(state => state.auth);

    const callbacks = {
        getProfile: useCallback(token => store.actions.auth.fetchProfile(token)),
    }

    useEffect(() => {
        if (authToken) {
            callbacks.getProfile(authToken);
        } else {
            navigate('/login');
        }
    }, [authToken]);

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