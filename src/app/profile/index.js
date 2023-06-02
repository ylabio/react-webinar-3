import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import {useEffect} from "react";
import Auth from "../../containers/auth";
import ProfileCard from "../../components/profile-card";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";


function Profile() {

  const store = useStore();

  useEffect(()=>{
    store.actions.profile.load();

    return () => {
      store.actions.profile.clear();
    }
  }, [])

  const select = useSelector(state=> ({
    userData: state.profile.userData
  }))

  return (
    <PageLayout>
      <Auth/>
      <Head title={'Магазин'}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      {select.userData && <ProfileCard user={select.userData}/>}
    </PageLayout>
  );
}

export default Profile;
