import { memo } from "react"
import LoginHeaderContainer from "../../containers/login-header"
import Head from "../../components/head"
import PageLayout from "../../components/page-layout"
import useTranslate from "../../hooks/use-translate"
import LocaleSelect from "../../containers/locale-select"
import Navigation from "../../containers/navigation"
import { getCookie } from "../../api/http"
import Profile from "../../containers/profile"
import useInit from "../../hooks/use-init"
import useStore from "../../hooks/use-store"
import { Navigate } from "react-router-dom"
function ProfilePage(){
    const store= useStore();
    const token = getCookie("token")
    if(!token){
        return <Navigate to={'/login'}/>
    }
    const { t } = useTranslate();

    useInit(
        () => {
          store.actions.user.initUser();
        },
        [],
        true,
      );

    return(
        <>
        <LoginHeaderContainer/>
        <Head title={t('title')}>
             <LocaleSelect />
        </Head>
        <PageLayout>
        <Navigation/>
        <Profile/>
        </PageLayout>
    </>
    )
}

export default memo(ProfilePage)