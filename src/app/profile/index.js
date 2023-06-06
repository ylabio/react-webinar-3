import {memo, useEffect} from "react";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../layouts/page-layout";
import Navigation from "../../containers/navigation";
import UserPage from "../../components/user-page";
import Header from "../../containers/header";
import useTranslate from "../../hooks/use-translate";
import ProfileCheck from "../../containers/profile-check";

function Profile() {

  const {t} = useTranslate();

  const select = useSelector(state => ({
    userInfo: state.session.userInfo,
  }));

  return (
    <PageLayout>
      <Header title={t('title')}/>
      <Navigation />
      <ProfileCheck redirect="/login">
        <UserPage userInfo={select.userInfo} t={t}/>
      </ProfileCheck>
    </PageLayout>
  );
}

export default memo(Profile);
