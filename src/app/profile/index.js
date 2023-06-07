import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import ProfileForm from "../../containers/profileForm";
import LogButton from "../../components/LogButton";
import Head from "../../components/head";
import { getLocalStorageItem, removeLocalStorage } from "../../utils";
import useStore from "../../hooks/use-store";

function Profile () {
    const {t} = useTranslate();
    const navigate = useNavigate();
    const name = getLocalStorageItem("name");
    
    const store = useStore();

    const handleExit = () => {
        removeLocalStorage("token");
        removeLocalStorage("name");
        store.actions.profile.resetState();
        navigate("/login");
    };
      return(
          <PageLayout>
              <LogButton title={t("exit")} info={name} onClick={handleExit}/>
              <Head title={t('title')}></Head>
              <Navigation />
              <ProfileForm/>
          </PageLayout> 
      )
  }
  
  export default Profile;