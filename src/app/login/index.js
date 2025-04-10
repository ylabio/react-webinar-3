import { memo} from "react"
import Head from "../../components/head"
import PageLayout from "../../components/page-layout"
import useTranslate from "../../hooks/use-translate"
import LocaleSelect from "../../containers/locale-select"
import Navigation from "../../containers/navigation"
import Login from "../../containers/login"
import {  Navigate } from "react-router-dom"
import { getCookie } from "../../api/http"
import LoginHeaderContainer from '../../containers/login-header' 

function LoginPage (){
    const token = getCookie("token")
    if(token){
        return <Navigate to={'/'}/>
    }

    const { t } = useTranslate();
    
    return(
        <>
            <LoginHeaderContainer/>
            <Head title={t('title')}>
                 <LocaleSelect />
            </Head>
            <PageLayout>
            <Navigation/>
            <Login/>
            </PageLayout>
        </>
    )
}

export default memo(LoginPage)