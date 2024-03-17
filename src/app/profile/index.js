import React, {useCallback, useEffect, useState} from "react";
import AuthHead from "../../containers/auth-head";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import PageLayout from "../../components/page-layout";
import useTranslate from "../../hooks/use-translate";
import ProfileInfo from "../../components/profile-info";
import FlexContainer from "../../components/flex-container";
import Navigation from "../../containers/navigation";
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import FormInput from "../../components/form-input";

function Profile() {

  const {t} = useTranslate();

  const navigate = useNavigate()

  const select = useSelector(state => ({
    profile: state.auth.profile,
    waiting: state.auth.waiting,
    isAuth: state.auth.isAuth,
  }));

  const links = {
    login: '/login'
  }

  useEffect(() => {
    if (!select.isAuth) {
      navigate(links.login)
    }
  }, [select.isAuth]);

  return (
    <PageLayout>
      <AuthHead/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <FlexContainer title='Профиль'>
        {
          select.profile && <ProfileInfo profile={select.profile}/>
        }
      </FlexContainer>
    </PageLayout>
  )
}


export default React.memo(Profile);