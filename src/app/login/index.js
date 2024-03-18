import React, { useEffect } from 'react'
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import HeadProfileInfo from '../../containers/head-profile-info';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import ProfileLogin from '../../containers/profile-login';
import useSelector from '../../hooks/use-selector';
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
    const {t} = useTranslate();
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.profile.isAuthenticated);

    useEffect(() => {
        if(isAuthenticated) navigate("/profile")
    },[isAuthenticated])

    if(isAuthenticated){
        return <Navigate to= "/profile"/>
    }

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