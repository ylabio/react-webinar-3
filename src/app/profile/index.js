import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import HeadProfileInfo from '../../containers/head-profile-info';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';
import { Navigate} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import ProfileMain from '../../containers/profile-main';

function Profile() {
    const {t} = useTranslate();
    const isAuthorized = useSelector(state => state.profile.isAuthorized)
    const isAuthenticated = useSelector(state => state.profile.isAuthenticated)
    const store = useStore()

    useLayoutEffect(() => {
        if(!isAuthorized && isAuthenticated) store.actions.profile.authorization();
    },[isAuthorized])

    if(!isAuthenticated){
        return <Navigate to= "/login"/>
    }

    return(
    <PageLayout>
        <HeadProfileInfo />
        <Head title={t('title')}>
            <LocaleSelect />
        </Head>
        <Navigation />
        <ProfileMain/>
    </PageLayout>
);
}

export default Profile