import Head from "../../components/head";
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";
import UserInf from "../../components/user-profil";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import { memo, useEffect } from "react";
import useStore from "../../hooks/use-store";
import Spinner from "../../components/spinner";



const UserProfile = () => {
  const { t } = useTranslate();
  const select = useSelector((state) => ({
    token:state.user.token,
    profile: state.profiles.profile,
    waiting: state.profiles.waiting,
  }));
const store =useStore();
useEffect(()=>{
  store.actions.profiles.getProfile(select.token)
},[])

  return (
    <>
    <PageLayout>
        <Head title={t("title")}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <Spinner active={select.waiting}>
            <UserInf result={select.profile} />
        </Spinner>
      
    </PageLayout>
      
    </>
  );
};

export default memo(UserProfile) ;
