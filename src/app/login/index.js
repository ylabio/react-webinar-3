import { memo} from "react"
import Head from "../../components/head"
import PageLayout from "../../components/page-layout"
import useTranslate from "../../hooks/use-translate"
import LocaleSelect from "../../containers/locale-select"
import Navigation from "../../containers/navigation"
import Login from "../../containers/login"
function LoginPage (){

    const { t } = useTranslate();
    
    return(
        <>
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