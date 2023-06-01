import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import {useCallback} from "react";
import Auth from "../../containers/auth";
import ProfileCard from "../../components/profile-card";
import useSelector from "../../hooks/use-selector";


function Profile() {

  // const callback = {
  //   onSubmit: useCallback((values)=>{
  //     console.log('Login onSubmit', values);
  //   }, [])
  // }

  const select = useSelector(state=> ({
    user: state.auth.user
  }))

  return (
    <PageLayout>
      <Auth/>
      <Head title={'Магазин'}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      {select.user && <ProfileCard user={select.user}/>}
    </PageLayout>
  );
}

export default Profile;
