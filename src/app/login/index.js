import React, { useEffect } from 'react'
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import HeadProfileInfo from '../../containers/head-profile-info';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import ProfileLogin from '../../containers/profile-login';

function Login() {
    const {t} = useTranslate();

    return (
        <PageLayout>
        <HeadProfileInfo/>
        <Head title={t('title')}>
            <LocaleSelect/>
        </Head>
        <Navigation/>
        <ProfileLogin/>
        </PageLayout>
)
}

export default Login