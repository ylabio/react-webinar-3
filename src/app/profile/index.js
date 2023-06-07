import {memo, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector"
import PageLayout from "../../components/page-layout"
import User from "../../containers/user"
import Head from "../../components/head"
import LocaleSelect from "../../containers/locale-select"
import Navigation from "../../containers/navigation"
import ProfileCard from "../../components/profile-card"
import Spinner from "../../components/spinner"
import UserCard from "../../containers/user-card"

  function Profile() {
    const {t} = useTranslate();

    return (
      <PageLayout>
        <User/>
        <Head title={t('title')}>
          <LocaleSelect/>
        </Head>
        <Navigation />
        <UserCard/>
      </PageLayout>
    );
  }

export default memo(Profile);