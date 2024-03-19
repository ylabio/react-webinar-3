import { memo } from "react";
import PageLayout from "../../components/page-layout";
import AuthTool from "../../containers/auth-tool";
import useSelector from "../../hooks/use-selector";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import ProfileInfo from "../../components/profile-info";
import useCheckAuth from "../../hooks/use-check-auth";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";


function Profile() {
    const store = useStore();
    const select = useSelector(state => ({
        token: state.user.token,
        email: state.userInfo.email,
        profile: state.userInfo.profile
    }));

    useCheckAuth()

    useInit(() => {
        if(select.token){
            store.actions.userInfo.getUserInfo(select.token)
        }
    }, [])

    const {t} = useTranslate()

    return (
        <PageLayout>
            <AuthTool />
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <ProfileInfo title={t("profile")} name={t('name')} phone={t('phone')} email={select.email} user={select.profile}/>
        </PageLayout>
    )
}

export default memo(Profile)