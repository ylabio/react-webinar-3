import React, {useCallback, useEffect} from "react";
import AuthHead from "../../containers/auth-head";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import PageLayout from "../../components/page-layout";
import useTranslate from "../../hooks/use-translate";
import ProfileInfo from "../../components/profile-info";
import FlexContainer from "../../components/flex-container";
import Navigation from "../../containers/navigation";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import useAuthCheck from "../../hooks/use-auth-check";

function Profile() {

  const {t} = useTranslate();
  const store = useStore()

  const callbacks = {
    getMyProfile: useCallback(() => store.actions.profile.getMyProfile(), [store])
  }

  const select = useSelector(state => ({
    profile: state.profile.myProfile,
    waiting: state.profile.waiting,
  }));

  useEffect(() => {
    callbacks.getMyProfile()
  }, []);


  return (
    <PageLayout>
      <AuthHead/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <FlexContainer title='Профиль'>
          <ProfileInfo profile={select.profile}/>
        </FlexContainer>
      </Spinner>
    </PageLayout>
  )
}


export default React.memo(useAuthCheck(Profile));