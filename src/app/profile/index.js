import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import HeadProfileInfo from '../../containers/head-profile-info';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useStore from '../../hooks/use-store';
import ProfileMain from '../../containers/profile-main';

function Profile() {
    const {t} = useTranslate();
    const store = useStore()

    useLayoutEffect(() => {
        store.actions.profile.authorization();
    },[])

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