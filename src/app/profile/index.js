import { memo, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import AuthTool from "../../containers/auth-tool";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import ProfileInfo from "../../components/profile-info";


function Profile() {
    const select = useSelector(state => ({
        token: state.user.token,
        user: state.user.user
    }));

    const navigate = useNavigate()

    const {t} = useTranslate()

    useEffect(() => {
        if(!select.token){
            navigate('/login')
        }
    }, [])

    return (
        <PageLayout>
            <AuthTool />
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <ProfileInfo name={t('name')} phone={t('phone')} email={select.user.email} user={select.user.profile}/>
        </PageLayout>
    )
}

export default memo(Profile)