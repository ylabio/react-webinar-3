import { memo } from "react"
import LoginHeaderContainer from "../../containers/login-header"
import Head from "../../components/head"
import PageLayout from "../../components/page-layout"
import useTranslate from "../../hooks/use-translate"
import LocaleSelect from "../../containers/locale-select"
import Navigation from "../../containers/navigation"
import Profile from "../../containers/profile"
function ProfilePage(){
    
    const { t } = useTranslate();

    return(
        <>
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